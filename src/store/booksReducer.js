import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
    name: "books",
    initialState: {
        list: []
    },
    reducers: {
        booksRecieved: (books, action) => {
            books.list = action.payload
        }
    }
})

export const { booksRecieved } = slice.actions

export const loadBooks = () => (dispatch) => {
    dispatch(
      apiCallBegan({
        onSuccess:  booksRecieved.type,
        //onError: booksRequestedFailed.type,
      })
    );
  };

export default slice.reducer

