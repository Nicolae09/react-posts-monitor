import React from 'react';
import './Error.scss';

const Error = ({errorMessage, retryCallback}) => {
    return (
        <div className="error">
            <h2 className="error_title">Error Occurred</h2>
            <p className="error_message">{errorMessage}</p>
            <button
                type="button"
                onClick={retryCallback}
                className="error_btn"
            >
                Reload data
            </button>
        </div>
    );
};

export default Error;
