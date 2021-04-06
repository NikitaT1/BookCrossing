import React, { useState, useEffect } from "react";
import { getBooks} from "../services/fakeBooksService";
import { useDispatch, useSelector } from "react-redux";


function Books() {



  const [books, setBooks] = useState([]);

  useEffect(() => {
    let books = getBooks();
    setBooks(books);
  }, []);

  const handeDelete = (id) => {
    let booksList = books.filter(f => f._id !== id)
    setBooks(booksList)
  }  

  if (books.length === 0) return <p>There are no books in database</p>
  
  return (
    
    <div>
     <p>There are {books.length} books in database</p>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Genre</th>
            <th>Stock</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {books.map((m) => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.genre.name}</td>
              <td>{m.numberInStock}</td>
              <td>{m.dailyRentalRate}</td>
              <td><button className='btn btn-danger btn-sm' onClick={()=>handeDelete(m._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
