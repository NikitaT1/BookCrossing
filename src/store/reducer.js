import { combineReducers } from "redux";
import booksReducer from "./booksReducer";
import genresReducer from "./genresReducer";

export default combineReducers({
  books: booksReducer,
  genres: genresReducer,
});
