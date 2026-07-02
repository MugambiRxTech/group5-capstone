# Smart Weather Advisory System

Smart Weather Advisory System is a weather planning app. You search a city, see the forecast, and can save locations you care about. Once a location is bookmarked, you can attach notes to it (like packing reminders or plans tied to a specific date) and the app keeps track of cities you've recently checked.

This started as a React-only frontend using a public weather API. For Phase 2 we added our own Flask backend and a PostgreSQL database, so accounts and saved data are now real and persistent instead of living only in the browser.
## Features

- Sign up / log in with a JWT-based session
- Search for a city and get current weather plus a multi-day forecast (data from Open-Meteo, no API key needed)
- Bookmark a location, with a snapshot of the weather saved at the time
- Add, edit, and delete planning notes attached to a bookmarked location
- Recently viewed cities are tracked automatically
- Detailed forecast page for a closer look at one location
## Built With

**Frontend:** React (Vite), React Router, Tailwind CSS, Context API for state, react-hot-toast for notifications

**Backend:** Flask, SQLAlchemy, Flask-Migrate, Flask-JWT-Extended, Flask-Bcrypt, PostgreSQL

**Weather data:** [Open-Meteo](https://open-meteo.com/)

## Project Structure

```
client/     React frontend
  src/
    contexts/    Auth, Weather, Bookmarks, PlanningNotes, RecentViews
    pages/       Home, Login, SignUp, Bookmarks, DetailedForecast
    components/  BookmarkCard, AlertCard, RecentlyViewedCard, etc.

server/     Flask backend
  app/
    models/      User, Bookmark, PlanningNote, RecentView
    routes/      auth, bookmarks, planning_notes, recent_views, weather
  migrations/
  run.py
```
## Getting Started

You'll need Node.js, Python 3.8+, and PostgreSQL installed.

### 1. Clone the repo
```bash
git clone https://github.com/MugambiRxTech/group5-capstone.git
cd group5-capstone
```

### 2. Set up the database
```bash
sudo service postgresql start
sudo -u postgres psql
```
Then inside psql:
```sql
CREATE USER atmosphere_user WITH PASSWORD 'strongpassword123';
CREATE DATABASE atmosphere_db OWNER atmosphere_user;
GRANT ALL PRIVILEGES ON DATABASE atmosphere_db TO atmosphere_user;
\q
```

### 3. Backend
```bash
cd server
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
flask db upgrade
python run.py
```
Runs on `http://127.0.0.1:5000`

### 4. Frontend
Open a new terminal:
```bash
cd client
npm install
npm run dev
```
Runs on `http://localhost:5173`

## Environment Variables

Create a `.env` file inside `server/`:
SECRET_KEY=your-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=postgresql+psycopg2://atmosphere_user:strongpassword123@localhost:5432/atmosphere_db

Create a `.env` file inside `client/`:
VITE_API_BASE_URL=http://127.0.0.1:5000
VITE_GOOGLE_CLIENT_ID=your-google-client-id

## Deployment

Not deployed yet — runs locally following the setup instructions above.