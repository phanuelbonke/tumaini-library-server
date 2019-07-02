import React from "react";

function Books({ booksInfo }) {
    const { book_id, name, cover_url, dicription, pub_id, id } = booksInfo;
    return (
        <div className="bkls-books">
            <div className="bkls-name">{name}</div>
            <img className="bkls-cover" src={cover_url} alt={name} />
            <div className="bkls-book-body">
            <p className="bkls-book_id">{book_id}</p>    
            <p className="bkls-dicription">{dicription}</p>
            <p className="bkls-pub_id">{pub_id}</p>
            <p className="bkls-id">{id}</p>
            </div>
            <div className="bkls-books-footer">
                <a href={`/books/${id}`} className="bkls-btn bkls-btn-dicription">
                    dicription
                </a>
            </div>
        </div>
    );
}

export default Books;