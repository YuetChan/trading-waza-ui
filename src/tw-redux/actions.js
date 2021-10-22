import MetaService from "../services/meta-service";
import RowService from "../services/row-service";
import SubscribeService from '../services/subscribe-service'

export const updateFilter = (dateStr, indicators) => async (dispatch) => {
  let action = null;
  try {
    const res = await RowService.getRowsByFilter(dateStr, indicators);
    action = res.status === 200 ? updateFilterDone(res.rows) : updateFilterFailed();
  }catch (err) { 
    action = updateFilterFatal(err);
  }
  
  dispatch(action);
};

export const updateIndicatorPrefix = (prefix)  => async (dispatch) => {
  let action = null;
  try {
    const res = await MetaService.getIndicatorsByPrefix(prefix);
    console.log(res.status)
    console.log(res);
    action = res.status === 200 ? updateIndicatorPrefixDone(res.data.indicators.map(obj => obj.name)) : updateIndicatorPrefixFailed();
    console.log(res.data.indicators.map(obj => obj.name));
  }catch (err) { 
    action = updateIndicatorPrefixFatal(err); 
  }
  
  dispatch(action);
  return {type: UPDATE_INDICATOR_PREFIX };
};

export const updateFilterDone = (data) => ({ type: UPDATE_FILTER_DONE, payload: data });
export const updateFilterFailed = () => ({ type: UPDATE_FILTER_FAILED});
export const updateFilterFatal = (err) => ({type: UPDATE_FILTER_FATAL});

export const updateIndicatorPrefixDone = (data) => ({ type: UPDATE_INDICATOR_PREFIX_DONE, payload: data});
export const updateIndicatorPrefixFailed = ()  => ({ type: UPDATE_INDICATOR_PREFIX_FAILED });
export const updateIndicatorPrefixFatal = (err)  => ({ type: UPDATE_INDICATOR_PREFIX_FATAL });

export const UPDATE_FILTER = 'UPDATE_FILTER';
export const UPDATE_FILTER_DONE = 'UPDATE_FILTER_DONE';
export const UPDATE_FILTER_FAILED = 'UPDATE_FILTER_FAILED';
export const UPDATE_FILTER_FATAL = 'UPDATE_FILTER_FATAL';

export const UPDATE_INDICATOR_PREFIX = 'UPDATE_INDICATOR_PREFIX';
export const UPDATE_INDICATOR_PREFIX_DONE = 'UPDATE_INDICATOR_PREFIX_DONE';
export const UPDATE_INDICATOR_PREFIX_FAILED = 'UPDATE_INDICATOR_PREFIX_FAILED';
export const UPDATE_INDICATOR_PREFIX_FATAL = 'UPDATE_INDICATOR_PREFIX_FATAL';