const getIndicatorsByPrefix = (prefix) => { 
  return {
    status: 200,
    data: ['td_9', 'golden_cross_100', 'golden_cross_200']
  };
}

const MetaService = { getIndicatorsByPrefix };
export default MetaService;