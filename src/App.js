import React from "react";
import Books from "./components/Books";

import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Genres from "./components/Genres";
import Book from "./components/Book";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Books />
    </Provider>
  );
}

export default App;
