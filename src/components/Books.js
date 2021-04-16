import React, { useState, useEffect } from "react";
import { loadBooks, bookDelete } from "../store/booksReducer";
import { useDispatch, useSelector } from "react-redux";
import Likes from "./common/Likes";
import { likeUpdate } from "./../store/booksReducer";

function Books() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);

  useEffect(() => {
    dispatch(loadBooks());
  }, []);

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
            <th></th>
            <th></th>
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
                <Likes
                  like={m.like}
                  likeButton={(likeNewStatus) =>
                    dispatch(likeUpdate(m._id, likeNewStatus))
                  }
                />
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  style={{ cursor: "pointer" }}
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
