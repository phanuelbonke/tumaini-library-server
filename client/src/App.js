import React from 'react';
import { Router } from "@reach/router";
import NavBar from "./NavBar";
import BookList from "./BookList";
import BooksDetails from "./BooksDetails";
import PublisherList from "./PublisherList";
import PublisherDetails from "./PublisherDetails";
import MemberList from "./MemberList";
import MemberDetails from "./MemberDetails";
import Admin from "./Admin";
import NotFound from "./NotFound";
import './App.css';


function App() {
  return (
    <div className="bkls-app">
      <header className="bkls-header">
        <NavBar />
      </header>
      <main className="bkls-main">
        <Router>
          <BookList path="/" />
          <BooksDetails path="/book/:booksId" />
          <PublisherList path="/publisher" />
          <PublisherDetails path="/publisher/:publisherId" />
          <MemberList path="/member" />
          <MemberDetails path="/member/:memberId" />
          <Admin path="/admin" />
          <NotFound default />
        </Router>
      </main>
    </div>
  );
}
export default App;
