import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import twReducer from "./tw-reducer";

function configureStore(state = {rows: [], indicators: []}) {
  return createStore(twReducer, state, applyMiddleware(thunk));
}

export default configureStore;