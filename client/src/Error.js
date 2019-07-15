import React from "react";

function error({message}) {
    return (
        <div className="bkls-fullpage-text">
            <p>({message})</p>
        </div>
    );
}
error.defaultProps = {
    message: "Sorry, a server, error occurred. please retry."
};

export default Error;