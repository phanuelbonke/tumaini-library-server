import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

 class MemberDetails extends React.Component {
         constructor(props) {
             super(props);
             this.state = {
                memberDetails: [],
                 book_auther: [],
                 loading: false,
                 error: false
             };
         }
    
            componentDidMount() {
             this.FetchMemberDetails();
         }
    
         fetchMemberDetails() {
             this.setState({ loading: true, error: false });
    
             const { memberId } = this.props;
             const memberDetailsPromise = axios.get(`/api/member/${memberId}`);
             const book_autherPromise = axios.get(`/api/bool_auther/${memberId}/book_auther`);
    
             axios
                 .all([memberDetailsPromise, book_autherPromise])
                 .then(
                     axios.spread((memberDetailsResponse, book_autherResponse) => {
                         this.setState({
                             memberDetails: memberDetailsResponse.data,
                             book_auther: book_autherResponse.data,
                             loading: false,
                             error: false
                         });
                     })
                 )
                 .catch(error => {
                     this.setState({
                         memberDetails: [],
                         book_auther: [],
                         loading: false,
                         error: true
                     });
                 });
         }
    
         
    
         render() {
             const { memberDetails, book_auther, loading, error } = this.state;
    
             if (loading) {
                 return <Loading />;
             }
    
             if (error) {
                 return <Error />;
             }
    
             if (memberDetails.length !== 1) {
                 return (
                     <Error message="Sorry, the member does not exist. Please retry." />
                 );
             }
    
             const {
                 id,
                 name,
                 address,
                 dicription,
                 book_id,
                 auther
             } = memberDetails[0];
             const book_autherNameDateStrings = book_auther.map(book_auther => {
                 const dateString = this.toDateString(book_auther.time);
    
                 return `${book_id.name}:${auther}`;
             });
             
                  
    
             return (
                 <div className="bkls-container">
                     <div className="bkls-member-details-wrapper">
                         <div className="bkls-member-details">
                        
                             <div className="bkls-member-details-info">
                                <h2>{name}</h2>
                                  <p>{dicription}</p>
                                 <p>
                                     <span>address</span>: {address}
                                 </p>
                                 <p>
                                     <span>id</span>: {id}
                                 </p>
                            
                                <p>{book_id}</p>
                                <p>{auther}</p>
                             </div>
                         </div>
                     </div>
                     <div className="bkls-member-book_auther">
                         <h2>List of authers</h2>
                         {auther.map(book_auther => {
                             const { book_id, auther } = book_auther;
    
                             return (
                                 <div
                                     key={`${book_id}:${auther}`}
                                     className="bkls-member-book_auther"
                                 >
                                     <h3>{book_id}</h3>
                                     <p>{auther}</p>
                                     
                                 </div>
                             );
                         })}
                     </div>
                 </div>
             );
         }
     }
export default MemberDetails;
