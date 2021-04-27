import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "books",
  initialState: {
    list: [],
  },
  reducers: {
    booksRecieved: (books, action) => {
      books.list = action.payload;
    },
    bookRemoved: (books, action) => {
      let newBook = books.list.filter((f) => f._id !== action.payload._id);
      books.list = newBook;
    },
    likeUpdated: (books, action) => {
      books.list.forEach((m) => {
        if (m._id === action.payload._id) {
          m.like = action.payload.like;
        }
      });
    },
    bookAdded: (books, action) => {
      books.list.push(action.payload);
    },
  },
});

export const {
  booksRecieved,
  bookRemoved,
  likeUpdated,
  bookAdded,
} = slice.actions;

export const loadBooks = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      onSuccess: booksRecieved.type,
      //onError: booksRequestedFailed.type,
      method: "GET",
      url: "movies",
    })
  );
};

export const bookDelete = (id) => (dispatch) => {
  dispatch(
    apiCallBegan({
      onSuccess: bookRemoved.type,
      data: id,
      method: "delete",
      url: "movies/" + id,
    })
  );
};

export const likeUpdate = (id, likeStatus) => (dispatch) => {
  dispatch(
    apiCallBegan({
      onSuccess: likeUpdated.type,
      data: { like: likeStatus },
      method: "put",
      url: "movies/like/" + id,
    })
  );
};

export const addBook = (title, genreId, numberInStock, dailyRentalRate) => (
  dispatch
) => {
  debugger;
  dispatch(
    apiCallBegan({
      onSuccess: bookAdded.type,
      data: { title, genreId, numberInStock, dailyRentalRate },
      method: "post",
      url: "movies/",
    })
  );
};

export default slice.reducer;
