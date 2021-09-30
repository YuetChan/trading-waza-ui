import TwService from "../services/tw-service";

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_INDICATOR_PREFIX = 'UPDATE_INDICATOR_PREFIX';

export const updateFilter = (dateStr, indicators) => async (dispatch) => {
    try {
      const res = await TwService.getRowsByFilter(dateStr, indicators);

      dispatch({
        type: UPDATE_FILTER,
        payload: res.rows,
      });
  
      return Promise.resolve(res.rows);
    } catch (err) {
      return Promise.reject(err);
    }
};

export const updateIndicatorPrefix = (prefix) => async (dispatch) => {
    try {
      const res = await TwService.getIndicatorsByPrefix(prefix);
  
      dispatch({
        type: UPDATE_INDICATOR_PREFIX,
        payload: res.data,
      });
  
      return Promise.resolve(res.data);
    } catch (err) {
      return Promise.reject(err);
    }
};

