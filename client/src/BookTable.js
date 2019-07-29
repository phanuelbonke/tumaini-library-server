import React from "react";

function BookTable({
    books,
    tableLoading,
    tableError,
    deleteSuccess,
    onEditBook,
    onDeleteBook
}) {
    if (tableLoading) {
        return <p className="bkls-table-loading">Loading books...</p>;
    }

    return (
        <div className="bkls-table">
            {deleteSuccess && (
                <p className="bkls-alert bkls-alert-success">
                    Record deleted successfully.
                </p>
            )}
            {tableError && (
                <p className="bkls-alert bkls-alert-error">
                    Sorry, a server error occurred. Please retry.
                </p>
            )}
            
        </div>
    );
}

export default BookTable;