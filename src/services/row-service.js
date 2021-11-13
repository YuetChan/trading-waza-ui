import axios from 'axios';
import qs from 'query-string';

const getRowsByFilter = (daysAgo, indicators) => {
  return axios.get('http://tradingwaza.com/api/tw-backend/rows', {
    params: {
        indicators: indicators,
        daysAgo: daysAgo,
        pageSize: 10000
    },
    paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  })
}

const RowService = { getRowsByFilter };
export default RowService;