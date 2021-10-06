import { UPDATE_FILTER_DONE, UPDATE_INDICATOR_PREFIX_DONE } from "./tw-actions";
  
  function twReducer(state, action) {
    
    const { type, payload } = action;
  
    console.log(state);

    switch (type) {
      case UPDATE_FILTER_DONE:
        return {
          ...state, 
          rows: payload
        };
  
      case UPDATE_INDICATOR_PREFIX_DONE:
        return {
          ...state, 
          indicators: payload
        };
  
      default:
        return state;

    }
  };
  
  export default twReducer;