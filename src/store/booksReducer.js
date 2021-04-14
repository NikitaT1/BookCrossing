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
      debugger;
      let newBook = books.list.filter((f) => f._id !== action.payload._id);
      books.list = newBook;
      console.log(books.list);
    },
  },
});

export const { booksRecieved, bookRemoved } = slice.actions;

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

// export const bookDelete = (id) => {
//   debugger;
//   console.log(id);
// };

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

export default slice.reducer;
