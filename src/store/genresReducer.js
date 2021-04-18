import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "genres",
  initialState: {
    list: [],
  },
  reducers: {
    genresRecieved: (genres, action) => {
      genres.list = action.payload;
    },
  },
});

export const { genresRecieved } = slice.actions;

export const loadGenres = () => (dispatch) => {
  dispatch(
    apiCallBegan({
      onSuccess: genresRecieved.type,
      url: "genres",
    })
  );
};

export default slice.reducer;
