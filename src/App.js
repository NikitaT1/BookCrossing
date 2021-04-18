import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import Books from "./components/Books";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Books />
    </Provider>
  );
}

export default App;
