//import axios from "axios";
import * as actions from "../api";
import { getBooks} from "../../services/fakeBooksService";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onStart, onError } = action.payload;

  //if(onStart)dispatch({type: onStart})

  next(action);

  try {
    const response = await getBooks()
    dispatch(actions.apiCallSuccess())
    if(onSuccess) dispatch({ type: onSuccess, payload: response });
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
  }
};

export default api;
