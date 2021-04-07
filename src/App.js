import React from "react";
import Books from "./components/Books";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Books />
    </Provider>
  );
}

export default App;
