import React from "react";
import { Link } from "@reach/router";
function NavBar() {
    return(
    <div className="bkls-container">
        <nav className="bkls-nav">
            <span className="bkls-name">book listing</span>
            
            <Link to="/">books</Link>
            <Link to="/publisher">publisher</Link>
            <Link to="/member">member</Link>
            <Link to="/borrower">borrower</Link>

        </nav>
    </div>
    );
}
export default NavBar;