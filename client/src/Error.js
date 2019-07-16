import React from "react";

function Error({ message }) {
    return (
        <div className="bkls-fullpage-text">
            <p>{message}</p>
        </div>
    );
}

Error.defaultProps = {
    message: "Sorry, a server, error occurred. please retry."
};

export default Error;