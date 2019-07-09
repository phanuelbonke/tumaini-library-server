import React from "react";
import axios from "axios";
import Books from "./Books";
import Loading from "./loading";
import Error from "./Error";

class BookList extends React.Component{
    constructor(props){
        super(props);
        this.state = {

booksInfo: [],
loading: false,
error: false
        };
    }

componetDidmount() {
    this.fetchBooksInfo();
    }
fetchBooksInfo() {
    this.setState({ loading: true, error: false});
    axios
    .get("http://localhost;9000/api/booksinfo")
    .get("/api/booksinfo")
    .then(response=>{
        this.setState({
        booksInfo: response.data,
        loading: false,
        error: false
    });
})
.catch(error => {
    this.setState({
        booksInfo:[],
        loading: false,
        error: true
    });
});
}
render() {
    const {booksInfo, loading, error } = this.state;
    if (loading){
        return <Loading />;
    }
    if (error){
        return <Error />;
    }

    return (
        <div className="bkls-container">
            <div className="bkls-books-list">
                {booksInfo.map(m => (
                    <Books key={m.id} booksInfo={m} />
                ))}
            </div>
        </div>
    );
                }
            }

export default BookList;