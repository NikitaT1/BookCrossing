import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import axios from "axios";
import moment from "moment";

const slice = createSlice({
    name: "books",
    initialState: {
        list: []
    },
    reducers: {
        bookAdded: (books, action) => {
            books.list.push(action.payload)
        }
    }
})

export const { bookAdded } = slice.actions

export default slice.reducer

