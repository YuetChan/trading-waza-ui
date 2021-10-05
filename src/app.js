import './app.scss';
import React, { useState, useEffect, useMemo } from 'react';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { MdAreaChart } from 'react-icons/md';

import { useDispatch, useSelector } from "react-redux";
import { updateFilter, updateIndicatorPrefix } from './redux/tw-actions';

import TickerTable from './components/ticker-table/tickers-table'
import IndicatorChips from './components/indicator-chips/indicator-chips';
import SubscribeDialog from './components/subscribe-dialog/subscribe-dialog'

const App = (state) => {
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
      date: '09-09-2021'
    },
    {
      ticker: 'OPEN',
      open: 20.05,
      high: 21.00,
      close: 21.10,
      low: 19.98,
      date: '09-09-2021'
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
          },
          {
            Header: 'Date',
            accessor: 'date'
          }
        ]
    }], [])

  return (
    <div className="app">
      <div class='app__nav-banner'>
        <div class='app__nav-banner__title'>
          Trading Waza
        </div>
        <div class='app__nav-banner__icon'>
          <MdAreaChart></MdAreaChart>
        </div>
        <div>
          <SubscribeDialog/>
        </div>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'start',
        }}>
        <div class='app__indicator-chips-wrapper'>
          <div class='app__indicator-chips-wrapper__indicator-chips'>
            <IndicatorChips/>
          </div>
          <div>
            <Pagination count={2} variant="outlined" size="medium" color="primary"/>
          </div>
        </div>
        <div class='app__tickers-table-wrapper'>
          <Box>
            <TickerTable columns={columns} data={data}/>
          </Box>
        </div>
      </Box>  
    </div>
  );
}

export default App;
