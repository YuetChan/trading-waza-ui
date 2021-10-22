import React, { useState, useEffect, useMemo } from 'react';
import './app.scss';

import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';

import { MdAreaChart } from 'react-icons/md';

import RowTable from './components/rows-table/rows-table'
import IndicatorFilter from './components/indicator-filter/indicator-filter';
import SubscribeDialog from './components/subscribe-dialog/subscribe-dialog';
import JoinUsCard from './components/join-us-card/join-us-card';

const App = () => {
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
        <div>
          {/* <SubscribeDialog/> */}
        </div>
      </div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'start',
        }}>
        <div className='app__indicator-filter-wrapper'>
          <div className='app__indicator-filter-wrapper__indicator-filter'>
            <IndicatorFilter/>
          </div>
          <div>
            <Pagination count={2} variant="outlined" size="medium" color="primary"/>
            <br></br>
            <br></br>
          </div>
          <div>
            <JoinUsCard/>
            <br></br>
          </div>
        </div>
        <div className='app__rows-table-wrapper'>
          <RowTable columns={columns} data={data}/>
        </div>
      </Box>  
    </div>
  );
}

export default App;
