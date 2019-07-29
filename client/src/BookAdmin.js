import React from "react";
import axios from "axios";
import BookForm from "./BookForm";
import BookTable from "./BookTable";

class BookAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            Book: [],
            tableLoading: false,
            tableError: false,
            deleteSuccess: false
        };

        this.resetFormState = this.resetFormState.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEditBook = this.handleEditBook.bind(this);
        this.handleDeleteBook = this.handleDeleteBook.bind(this);
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        this.setState({ tableLoading: true, tableError: false });

        axios
            .get("/api/book")
            .then(response => {
                this.setState({
                    book: response.data,
                    tableLoading: false,
                    tableError: false
                });
            })
            .catch(error => {
                this.setState({
                    books: [],
                    tableLoading: false,
                    tableError: true
                });
            });
    }

    resetFormState() {
        this.setState({
            name: "",
            editing: false,
            formSubmitting: false,
            validationErrors: {},
            formSuccess: false,
            formError: false,
            deleteSuccess: false
        });
    }

    isValid() {
        const { validationErrors, isValid } = this.validateFormInput(
            this.state
        );

        if (!isValid) {
            this.setState({ validationErrors });
        }

        return isValid;
    }

    validateFormInput(data) {
        const validationErrors = {};
        const { name } = data;

        if (!name) {
            validationErrors.name = "This field is required";
        }

        return {
            validationErrors,
            isValid: Object.keys(validationErrors).length === 0
        };
    }

    handleNameChange(e) {
        e.preventDefault();
        this.setState({ name: e.target.value });
    }

    handleSubmit(e) {
        e.preventDefault();

        const { editing, books, id, name } = this.state;

        if (this.isValid()) {
            this.setState({
                validationErrors: {},
                formSubmitting: true,
                formSuccess: false,
                formError: false
            });

            if (editing) {
                // Existing record - update
                axios
                    .put(`/api/books/${id}`, { name })
                    .then(response => {
                        this.resetFormState();

                        const index = books.findIndex(b => b.id === id);

                        this.setState({
                            formSuccess: true,
                            books: [
                                ...books.slice(0, index),
                                { id, name },
                                ...books.slice(index + 1)
                            ]
                        });
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            } else {
                // New record - Save
                axios
                    .post("/api/books", { name })
                    .then(response => {
                        this.resetFormState();
                        this.setState({
                            formSuccess: true,
                            books: [...books, { id: response.data, name }]
                        });
                    })
                    .catch(error => {
                        this.setState({
                            validationErrors: {},
                            formSubmitting: false,
                            formSuccess: false,
                            formError: true
                        });
                    });
            }
        }
    }

    handleEditBook(book) {
        return () => {
            this.setState({ ...book, editing: true });
        };
    }

    handleDeleteBook(book,books) {
        return () => {
            const { id, name } = book;

            // eslint-disable-next-line no-restricted-globals
            if (confirm(`Are you sure you want to delete '${name}'?`)) {
                axios
                    .delete(`/api/books/${id}`)
                    .then(response => {
                        const index = books.findIndex(c => c.id === id);

                        this.setState({
                            books: [
                                ...books.slice(0, index),
                                ...books.slice(index + 1)
                            ],
                            deleteSuccess: true,
                            tableError: false
                        });
                    })
                    .catch(error => {
                        this.setState({
                            deleteSuccess: false,
                            tableError: true
                        });
                    });
            }
        };
    }

    render() {
        const {
            name,
            editing,
            formSubmitting,
            validationErrors,
            formSuccess,
            formError,
            books,
            tableLoading,
            tableError,
            deleteSuccess
        } = this.state;

        return (
            <div className="bkls-book-admin">
                <h1>Book</h1>
                <h3>{editing ? "Edit Book" : "Add Book"}</h3>
                <BookForm
                    name={name}
                    formSubmitting={formSubmitting}
                    validationErrors={validationErrors}
                    formSuccess={formSuccess}
                    formError={formError}
                    handleNameChange={this.handleNameChange}
                    resetFormState={this.resetFormState}
                    handleSubmit={this.handleSubmit}
                />
                <BookTable
                    books={books}
                    tableLoading={tableLoading}
                    tableError={tableError}
                    deleteSuccess={deleteSuccess}
                    onEditBook={this.handleEditBook}
                    onDeleteBook={this.handleDeleteBook}
                />
            </div>
        );
    }
}

export default BookAdmin;