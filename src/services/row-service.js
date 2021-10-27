import axios from 'axios';
import qs from 'query-string';

const getRowsByFilter = (daysAgo, indicators) => {
  console.log(indicators)

  return axios.get('http://tradingwaza.com/api/tw-backend/rows', {
    params:{
        indicators: indicators,
        daysAgo: daysAgo
    },
    paramsSerializer: function(params) {
        return qs.stringify(params, {arrayFormat: 'repeat'})
    }
  })
}

const RowService = { getRowsByFilter };
export default RowService;