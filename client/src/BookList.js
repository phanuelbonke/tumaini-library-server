import React from "react";
import Books from "./Books";

function BookList({ booksInfo }) {
    return (
        <div className="bkls-container">
            <div className="bkls-book-list">
                {booksInfo.map(b => (
                    <Books key={b.book_id} booksInfo={b} />
                ))}
            </div>
        </div>
    );
}

export default BookList;