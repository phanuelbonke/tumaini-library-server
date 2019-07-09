import React from 'react';
import { Router } from "@reach/router";
import  NavBar from "./NavBar";
import BookList from "./BookList";
import BooksDetails from "./BooksDetails";
 import PublisherList from "./PublisherList";
 import MemberDetails from "./MemberDetails";
 import Borrower from "./Borrower";
 import NotFound from "./NotFound";
import './App.css';
import { MemberList } from 'twilio/lib/rest/ipMessaging/v2/service/channel/member';

  
function App() {
  return (
<div className="bkls-app">
  <header className="bkls-header">
    <NavBar />
  </header>
  <main className="bkls-main">
  <Router>
    <BookList path="/" />
    <BooksDetails path="/books/:booksId" />
    <PublisherList path="/publisher" />
    <publisherDetails path="/publisher/:publisherId" />
    <MemberList path="/member" />
    <MemberDetails path="/member/:memberId" />
    <BorrowerList path="/borrower" />
    <BorrowerDetails path="/borrower/:borrowerId" />
  </Router>
  </main>
</div>
  );
}
export default App;
