import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadGenres } from "../store/genresReducer";
import { loadBooks } from "../store/booksReducer";
import "./Book.css";

import Books from "./Books";
import Genres from "./Genres";

function Book() {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.list);
  const genres = useSelector((state) => state.genres.list);

  useEffect(() => {
    dispatch(loadBooks());
    dispatch(loadGenres());
  }, []);
  return (
    <div className="book">
      <Genres genres={genres} className="genres" />
      <Books books={books} />
    </div>
  );
}

export default Book;
