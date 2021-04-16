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
      debugger;
      books.list.forEach((m) => {
        debugger;
        if (m._id === action.payload._id) {
          debugger;
          m.like = action.payload.like;
        }
      });
    },
  },
});

export const { booksRecieved, bookRemoved, likeUpdated } = slice.actions;

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

export default slice.reducer;
