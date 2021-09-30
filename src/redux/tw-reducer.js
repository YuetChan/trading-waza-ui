import { UPDATE_FILTER, UPDATE_INDICATOR_PREFIX } from "./tw-actions";
  
  function TwReducer(state, action) {
    const { type, payload } = action;
  
    switch (type) {
      case UPDATE_FILTER:
        return {
          ...state, 
          rows: payload
        };
  
      case UPDATE_INDICATOR_PREFIX:
        return {
          ...state, 
          indicators: payload
        };
  
      default:
        return state;

    }
  };
  
  export default TwReducer;
  