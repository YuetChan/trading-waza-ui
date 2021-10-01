import './app.css';
import React, { useState, useEffect, useMemo } from 'react';

import { useDispatch, useSelector } from "react-redux";
import { updateFilter, updateIndicatorPrefix } from './redux/tw-actions';

import TickerTable from './components/tickers-table'
import ChipsArray from './components/indicator-chips';

const App = (state) => {
  // useEffect(() => { }, []);

  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(updateFilter('09-09-2021', ['td_9', 'golden_cross_200'])).then(val => {
      console.log(val)
    });
  }

  const data = useMemo(() => [
    {
      ticker: 'AAPL',
      open: 140.00,
      high: 142.40,
      close: 138.10,
      low: 137.96,
    }
]);

  const columns = useMemo(
    () => [{
        Header: 'Filtered Result',
        columns: [
          {
            Header: 'Ticker',
            accessor: 'ticker',
          },
          {
            Header: 'Open',
            accessor: 'open',
          },
          {
            Header: 'High',
            accessor: 'high',
          },
          {
            Header: 'Close',
            accessor: 'close',
          },
          {
            Header: 'Low',
            accessor: 'low',
          }
        ]
    }], [])

  return (
    <div className="App">
      {/* <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="javascript:void(0)"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
        >
          Learn React
        </a>
      </header> */}
      <TickerTable columns={columns} data={data}></TickerTable>
      <ChipsArray></ChipsArray>
    </div>
  );
}

export default App;
