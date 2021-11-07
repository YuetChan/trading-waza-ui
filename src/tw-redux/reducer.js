import { UPDATE_FILTER_DONE, UPDATE_INDICATOR_PREFIX_DONE } from "./actions";
  
  const primaryReducer = (state, action) => {
    const { type, payload } = action;

    console.log(payload);

    switch (type) {
      case UPDATE_FILTER_DONE:
        return { ...state, rows: Object.assign([], payload) };
  
      case UPDATE_INDICATOR_PREFIX_DONE:
        return { ...state, indicators: Object.assign([], payload) };

      default:
        return state;

    }
  };
  
  export default primaryReducer;