import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";

const slice = createSlice({
  name: "genres",
  initialState: {
    list: [],
    isFetching: false,
  },
  reducers: {
    genresRecieved: (genres, action) => {
      genres.list = action.payload;
      genres.isFetching = true;
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
