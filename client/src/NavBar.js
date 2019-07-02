import React from "react";
function NavBar() {
    return(
    <div className="bkls-container">
        <nav className="bkls-nav">
            <span className="bkls-name">book listing</span>
            <a  href="/">books</a>
            <a  href="/">publisher</a>
            <a  href="/">member</a>
            <a  href="/">borrower</a>

        </nav>
    </div>
    );
}
export default NavBar;