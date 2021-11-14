import { UPDATE_FILTER_DONE, UPDATE_INDICATOR_PREFIX_DONE, LOAD_TABLE, UNLOAD_TABLE } from "./actions";
  
  const primaryReducer = (state, action) => {
    const { type, payload } = action;

    switch (type) {
      case UPDATE_FILTER_DONE:
        return { ...state, rows: Object.assign([], payload) };
  
      case UPDATE_INDICATOR_PREFIX_DONE:
        return { ...state, indicators: Object.assign([], payload) };

      case LOAD_TABLE:
        return { ...state, tableLoading: true }  

      case UNLOAD_TABLE:
        return { ...state, tableLoading: false }  

      default:
        return state;

    }
  };
  
  export default primaryReducer;