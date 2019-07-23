import React from "react";
import axios from "axios";
import Loading from "./Loading";
import Error from "./Error";

class PublisherDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            publisherDetails: [],
            loading: false,
            error: false
        };
    }

    componentDidMount() {
        this.fetchpublisherDetails();
    }

    fetchpublisherDetails() {
        this.setState({ loading: true, error: false });

        const { publisherId } = this.props;
        const publisherDetailsPromise = axios.get(`/api/publisher/${publisherId}`);
        axios
            .all([publisherDetailsPromise])
            .then(
                axios.spread((publisherDetailsResponse) => {
                    this.setState({
                        publisherDetails: publisherDetailsResponse.data,
                        loading: false,
                        error: false
                    });
                })
            )
            .catch(error => {
                this.setState({
                    publisherDetails: [],
                    loading: false,
                    error: true
                });
            });
    }

    render() {
        const { publisherDetails, loading, error } = this.state;

        if (loading) {
            return <Loading />;
        }

        if (error) {
            return <Error />;
        }

         if (publisherDetails.length !== 1) {
            return (
                <Error message="Sorry, the publisher does not exist. Please retry." />
            );
         }

        const {
            pub_id,
            pub_name,
            pub_address,
            pub_info,
            books,

        } = publisherDetails[0];

        return (
            <div className="bkls-container">
                <div className="bkls-publisher-details-wrapper">
                    <div className="bkls-publisher-details">
                        <div className="bkls-publisher-details-info">
                            <p>
                                <span>pub_id</span>: {pub_id}
                            </p>
                            <h2>{pub_name}</h2>
                            <p>
                                <span>pub_address</span>:{pub_address}
                                </p>
                            <p>
                                <span>pub_info</span>: {pub_info}
                            </p>
                            <p>
                                <span>books</span>: {books}
                            </p>
                        </div>
                    </div>
                </div>
                );
            })}
 </div>              
        );
    }
}

export default PublisherDetails;