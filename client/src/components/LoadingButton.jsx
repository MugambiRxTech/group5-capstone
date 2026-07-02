import React from "react";

function LoadingButton({ loading, loadingText, children, className = "", ...props }) {
    return (
        <button
            {...props}
            disabled={props.disabled || loading}
            className={`disabled:opacity-60 disabled:cursor-not-allowed transition ${className}`}
        >
            {loading ? loadingText : children}
        </button>
    );
}

export default LoadingButton;