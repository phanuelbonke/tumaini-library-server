import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

class BooksDetails extends React.Component {
         constructor(props) {
             super(props);
             this.state = {
                 booksDetails: [],
                 dicription: [],
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
             const booksDetailsPromise = axios.get(`/api/books/${booksId}`);
             const dicriptionPromise = axios.get(`/api/books/${booksId}/dicription`);
    
             axios
                 .all([booksDetailsPromise, dicriptionPromise])
                 .then(
                     axios.spread((booksDetailsResponse, dicriptionResponse) => {
                         this.setState({
                             booksDetails: booksDetailsResponse.data,
                             dicription: dicriptionResponse.data,
                             loading: false,
                             error: false
                         });
                     })
                 )
                 .catch(error => {
                     this.setState({
                         booksDetails: [],
                         dicription: [],
                         loading: false,
                         error: true
                     });
                 });
         }
    
         toDateString(dateTime) {
             const date = new Date(dateTime);
             const year = date.getFullYear();
             const month = date.getMonth() + 1;
             const day = date.getDate();
    
             return `${year}-${month}-${day}`;
         }
    
         render() {
             const { booksDetails, dicription, loading, error } = this.state;
    
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
                pub_id,
                id,
                publisher
                
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
                                 <h2>{name}</h2>
                                 <p>{dicription}</p>
                                 <p>
                                     <span>pub_id</span>: {pub_id}
                                 </p>
                                 <p>
                                     <span>publisher</span>: {publisher}
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