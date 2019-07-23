import React from "react";
import { Link } from "@reach/router";
function NavBar() {
    return(
    <div className="bkls-container">
        <nav className="bkls-nav">
            <span className="bkls-name">book listing</span>
            
            <Link to="/books">Book</Link>
            <Link to="/publisher">Publisher</Link>
            <Link to="/member">Member</Link>
            <Link to="/admin">Admin</Link>

        </nav>
    </div>
    );
}
export default NavBar;