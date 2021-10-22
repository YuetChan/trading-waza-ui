import axios from 'axios';

const getIndicatorsByPrefix = (prefix) => { 
  return axios.get('http://tradingwaza.com/api/tw-backend/meta-data/indicators', { params: { name: prefix }})
}

const MetaService = { getIndicatorsByPrefix };
export default MetaService;