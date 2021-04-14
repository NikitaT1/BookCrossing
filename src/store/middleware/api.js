import axios from "axios";
import * as actions from "../api";
import config from "../../config.json";

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { url, method, data, onSuccess, onStart, onError } = action.payload;

  //if(onStart)dispatch({type: onStart})

  next(action);

  // switch (action.payload.onType) {
  //   case "loadBooks":
  //     try {
  //       const response = await getBooks();
  //       dispatch(actions.apiCallSuccess());
  //       if (onSuccess) dispatch({ type: onSuccess, payload: response });
  //       return;
  //     } catch (error) {
  //       dispatch(actions.apiCallFailed(error.message));
  //     }

  //   case "bookDelete":
  //     debugger;
  //     try {
  //       const response = await deleteBook(data);
  //       dispatch(actions.apiCallSuccess());
  //       if (onSuccess) dispatch({ type: onSuccess, payload: response });
  //     } catch (error) {
  //       dispatch(actions.apiCallFailed(error.message));
  //     }
  // }

  // try {
  //   const response = await getBooks();
  //   dispatch(actions.apiCallSuccess());
  //   if (onSuccess) dispatch({ type: onSuccess, payload: response });
  // } catch (error) {
  //   dispatch(actions.apiCallFailed(error.message));
  // }

  try {
    // let response;
    // if (method === "DELETE")
    //   response = await axios.delete(config.apiUrl + url + data);
    // dispatch(actions.apiCallSuccess(response.data));
    // if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    // else
    const response = await axios.request({
      baseURL: config.apiUrl,
      url,
      method,
      data,
    });
    dispatch(actions.apiCallSuccess(response.data));
    if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
