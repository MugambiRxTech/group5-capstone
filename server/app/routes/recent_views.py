from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import and_, func

from app.extensions import db
from app.models.recent_view import RecentView


recent_views_bp = Blueprint(
    "recent_views_bp",
    __name__,
    url_prefix="/api/recent-views"
)


@recent_views_bp.route("", methods=["GET"])
@jwt_required()
def get_recent_views():
    user_id = get_jwt_identity()

    recent_views = (
        RecentView.query
        .filter_by(user_id=user_id)
        .order_by(RecentView.viewed_at.desc())
        .all()
    )

    unique_views = []
    seen_keys = set()

    for view in recent_views:
        city_key = view.city.strip().lower()
        country_key = view.country.strip().lower() if view.country else ""
        key = (city_key, country_key)

        if key in seen_keys:
            continue
        seen_keys.add(key)
        unique_views.append(view)

        if len(unique_views) >= 10:
            break

    return jsonify({
        "recent_views": [item.to_dict() for item in unique_views]
    }), 200


@recent_views_bp.route("", methods=["POST"])
@jwt_required()
def create_recent_view():
    from datetime import datetime
    from sqlalchemy.exc import IntegrityError

    user_id = get_jwt_identity()
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body is required"}), 400

    city = data.get("city")
    country = data.get("country")
    latitude = data.get("latitude")
    longitude = data.get("longitude")

    if not city or latitude is None or longitude is None:
        return jsonify({
            "error": "city, latitude and longitude are required"
        }), 400

    normalized_city = city.strip()
    normalized_country = country.strip() if isinstance(country, str) else ""

    existing_recent_view = RecentView.query.filter(
        RecentView.user_id == user_id,
        func.lower(func.trim(RecentView.city)) == normalized_city.lower(),
        func.lower(func.trim(RecentView.country)) == normalized_country.lower(),
    ).first()

    try:
        if existing_recent_view:
            existing_recent_view.latitude = latitude
            existing_recent_view.longitude = longitude
            existing_recent_view.viewed_at = datetime.utcnow()
            db.session.commit()
            return jsonify({
                "message": "Recent view updated successfully",
                "recent_view": existing_recent_view.to_dict()
            }), 200

        recent_view = RecentView(
            user_id=user_id,
            city=normalized_city,
            country=normalized_country,
            latitude=latitude,
            longitude=longitude,
        )
        db.session.add(recent_view)
        db.session.commit()

        return jsonify({
            "message": "Recent view saved successfully",
            "recent_view": recent_view.to_dict()
        }), 201

    except IntegrityError:
        db.session.rollback()
        existing = RecentView.query.filter_by(
            user_id=user_id, city=city, country=country
        ).first()
        existing.viewed_at = datetime.utcnow()
        db.session.commit()
        return jsonify({
            "message": "Recent view updated successfully",
            "recent_view": existing.to_dict()
        }), 200


@recent_views_bp.route("", methods=["DELETE"])
@jwt_required()
def clear_recent_views():
    user_id = get_jwt_identity()

    RecentView.query.filter_by(user_id=user_id).delete()
    db.session.commit()

    return jsonify({
        "message": "Recent views cleared successfully"
    }), 200