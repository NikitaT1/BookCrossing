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
      books.list.filter((f) => f._id !== action.payload.id);
    },
  },
});

export const { booksRecieved, bookRemoved } = slice.actions;

export const loadBooks = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      onSuccess: booksRecieved.type,
      //onError: booksRequestedFailed.type,
      onType: "loadBooks",
    })
  );
};

export const bookDelete = (id) => (dispatch) => {
  debugger;
  dispatch(
    apiCallBegan({
      data: id,
      onType: "bookDelete",
      onSuccess: bookRemoved.type,
    })
  );
};

export default slice.reducer;
