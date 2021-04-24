import React from "react";
import { Provider } from "react-redux";
import configureStore from "./store/configureStore";
import { Route, Switch, Redirect } from "react-router-dom";
import Books from "./components/books";
import NotFound from "./components/notFound";
import Users from "./components/users";
import Rentals from "./components/rentals";
import BookForm from "./components/bookForm";
import NavBar from "./components/navBar";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <NavBar />
      <Switch>
        <Route path="/books/:id" component={BookForm}></Route>
        <Route path="/books" component={Books}></Route>
        <Route path="/users" component={Users}></Route>
        <Route path="/rentals" component={Rentals}></Route>
        <Route path="/not-found" component={NotFound}></Route>
        <Redirect from="/" exact to="/books" />
        <Redirect to="/not-found" />
      </Switch>
    </Provider>
  );
}

export default App;
