import React, { useState, useEffect } from "react";
import { loadBooks, bookDelete } from "../store/booksReducer";
import { useDispatch, useSelector } from "react-redux";

function Books() {
  // const [books, setBooks] = useState([]);

  // useEffect(() => {
  //   let books = getBooks();
  //   setBooks(books);
  // }, []);

  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);

  useEffect(() => {
    dispatch(loadBooks());
  }, []);

  // let arrId = "5b21ca3eeb7f6fbccd471815";

  // let books2 = books;

  // // if (books2.length !== 0) {
  // //   let booksInDb = books2.filter((m) => m._id !== arrId);
  // // }

  // const handeDelete = (id) => {
  //   bookDelete(id);
  // };

  if (books.length === 0) return <p>There are no books in database</p>;

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
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => dispatch(bookDelete(m._id))}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Books;
