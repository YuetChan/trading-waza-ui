import { UPDATE_FILTER_DONE, UPDATE_INDICATOR_PREFIX_DONE } from "./tw-actions";
  
  const twReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case UPDATE_FILTER_DONE:
        return { ...state, rows: Object.assign([], payload) };
  
      case UPDATE_INDICATOR_PREFIX_DONE:
        return { ...state, indicators: Object.assign([], payload) };
  
      default:
        return state;

    }
  };
  
  export default twReducer;