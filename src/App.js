import React from "react"
import Books from './components/Books'
import { Provider } from 'react-redux'
import configureStore from "./store/configureStore";



function App() {
  const store = configureStore();
   //store.dispatch((dispatch, getState) => ({type: 'Action', payload: [1,2,3,4,5]}))
   store.dispatch({type: 'Action', payload: [1,2,3,4,5]})
   store.dispatch({type: 'Error', payload: {message: "testing errors middleware"}})
   

  return (
    <Provider store={store}>
        <Books/>
        </Provider>
  );
}

export default App;
