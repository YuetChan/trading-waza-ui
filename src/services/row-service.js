const getRowsByFilter = (dateStr, indicators) => {
  return {
    rows: [{
      name: 'AAPL',
      openPrice: 140.00,
      highPirce: 142.40,
      closePrice: 138.10,
      lowPrice: 137.96,
      indicators: ['td_9']
    }, {
      name: 'fb',
      openPrice: 334.00,
      highPirce: 336.40,
      closePrice: 334.22,
      lowPrice: 333.56,
      indicators: ['golden_cross_200']
    }]
  }
}

const RowService = { getRowsByFilter };
export default RowService;