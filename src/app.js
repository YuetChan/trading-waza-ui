import React, { useState, useMemo } from 'react';
import { useSelector } from 'react-redux';

import './app.scss';

import { MdAreaChart } from 'react-icons/md';

import RowTable from './components/rows-table/rows-table'
import IndicatorFilter from './components/indicator-filter/indicator-filter';
import JoinUsCard from './components/join-us-card/join-us-card';

import moment from 'moment';
import 'moment-timezone';

const App = () => {

  const rows = useSelector(state => {
    return state.rows.map(row => {
      const priceDetail = row.priceDetail;

      return {
        ticker: row.ticker.name,
        date: moment(row.processedAt).tz('America/New_York').format("YYYY-MM-DD"),
        change: priceDetail.change.toFixed(2),

        open: priceDetail.open.toFixed(2),
        high: priceDetail.high.toFixed(2),
        close: priceDetail.close.toFixed(2),
        low: priceDetail.low.toFixed(2)
      };
    });
  });

  const columns = useMemo(
    () => [{
        Header: 'Filtered Result(Daily Chart Only)',
        columns: [{
            Header: 'Ticker',
            accessor: 'ticker',
          },{
            Header: 'Open',
            accessor: 'open',
          },{
            Header: 'High',
            accessor: 'high',
          },{
            Header: 'Close',
            accessor: 'close',
          },{
            Header: 'Low',
            accessor: 'low',
          },{
            Header: 'Change %',
            accessor: 'change',
          },{
            Header: 'Date',
            accessor: 'date'
          }
        ]
    }], []);

  return (
    <div className="app">
      <div className='app__nav-banner'>
        <div className='app__nav-banner__title'>
          Trading Waza
        </div>
        <div className='app__nav-banner__icon'>
          <MdAreaChart></MdAreaChart>
        </div>
      </div>

      <div className='app__layout'>
        <div className='app__indicator-filter-wrapper'>
          <div className='app__indicator-filter-wrapper__indicator-filter'>
            <IndicatorFilter/>
          </div>

          <div>
            <JoinUsCard/>
            <br></br>
          </div>
        </div>

        <div className='app__rows-table-wrapper'>
          <RowTable columns={columns} data={rows.sort((a, b) => a.ticker.localeCompare(b.ticker))}/>
        </div>
      </div> 
    </div>
  );
}

export default App;
