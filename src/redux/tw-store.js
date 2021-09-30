import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import TwReducer from "./tw-reducer";

function configureStore(state = {rows: [], indicators: []}) {
  return createStore(TwReducer, state, applyMiddleware(thunk));
}

export default configureStore;