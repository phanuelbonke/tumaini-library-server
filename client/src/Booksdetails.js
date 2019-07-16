import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

class BooksDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            booksDetails: [],
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.fetchBooksDetails();
    }

    fetchBooksDetails() {
        this.setState({ loading: true, error: false });

        const { booksId } = this.props;
        const booksDetailsPromise = axios.get(`/api/book/${booksId}`);
        axios
            .all([booksDetailsPromise])
            .then(
                axios.spread((booksDetailsResponse) => {
                    this.setState({
                        booksDetails: booksDetailsResponse.data,
                        loading: false,
                        error: false
                    });
                })
            )
            .catch(error => {
                this.setState({
                    booksDetails: [],
                    loading: false,
                    error: true
                });
            });
    }

    render() {
        const { booksDetails, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error />;
        }

         if (booksDetails.length !== 1) {
            return (
                <Error message="Sorry, the movie does not exist. Please retry." />
            );
         }

        const {
            book_id,
            name,
            cover_url,
            dicription,
            pub_id,
            id,

        } = booksDetails[0];

        return (
            <div className="bkls-container">
                <div className="bkls-books-details-wrapper">
                    <div className="bkls-books-details">
                        <img
                            className="bkls-books-details-cover_url"
                            src={cover_url}
                            alt={name}
                        />
                        <div className="bkls-books-details-info">
                            <p>
                                <span>book_id</span>: {book_id}
                            </p>
                            <h2>{name}</h2>
                            <p>
                                <span>dicription</span>:{dicription}
                                </p>
                            <p>
                                <span>pub_id</span>: {pub_id}
                            </p>
                            <p>
                                <span>id</span>: {id}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bkls-books-dicription">

                </div>
                );
            })}
 </div>              
        );
    }
}

export default BooksDetails;