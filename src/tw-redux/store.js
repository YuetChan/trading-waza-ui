import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import primaryReducer from "./reducer";

const configureStore = (state = {rows: [], indicators: [], tableLoading: false}) => (createStore(primaryReducer, state, applyMiddleware(thunk))) ;
export default configureStore;