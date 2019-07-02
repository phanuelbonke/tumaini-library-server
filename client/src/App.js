import React from 'react';
import  NavBar from "./NavBar";
import BookList from "./BookList";
import './App.css';
const BOOKS_INFO = [
  {
  book_id:1,
  name:"A man of the people",
  cover_url:"https://cdn-images-1.medium.com/max/311/1*ZXtCLu3THRyF2y-xli2fLg.jpeg",
  Discription:"This is a story about a young man",
  pub_id:1,
  id:2
  },
  {
    book_id:2,
    name:"The pearl",
    cover_url:"https://images-na.ssl-images-amazon.com/images/I/71qqJ-SdGTL.jpg",
    Discription:"This is a story to read. ",
    pub_id:1,
    id:1
    },
    {
      book_id:3,
      name:"primary science",
      cover_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRntJQjxCCYSxqZYdppY_QjCEJ1ApUIv74KjpaP7e3p_I3ouCUd",
      Discription:"A class three course work book",
      pub_id:3,
      id:1
      },
      {
        book_id:4,
        name:"man down",
        cover_url:"https://images-na.ssl-images-amazon.com/images/I/41TrDP5y1gL.SX316.SY316.jpg",
        Discription:"The question about the inner us!",
        pub_id:2,
        id:1
        },
];
function App() {
  return (
<div className="bkls-app">
  <header className="bkls-header">
    <NavBar />
  </header>
  <main className="bkls-main">
    <BookList booksInfo={BOOKS_INFO} />
  </main>
</div>
  );
}
export default App;
