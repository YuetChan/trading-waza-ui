import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { isMobile } from 'react-device-detect';

import './app.scss';

import RowTable from './components/rows-table/rows-table'
import IndicatorFilter from './components/indicator-filter/indicator-filter';
import JoinUsCard from './components/join-us-card/join-us-card';

import TrackingService from './services/tracking-service';

import moment from 'moment';
import 'moment-timezone';

import LinearProgress from '@mui/material/LinearProgress';

const App = () => {
  
  useEffect(() => {
    TrackingService.initGA()
    TrackingService.PageView();
  }, []);

  const loader = useSelector(state => {
    if(state.tableLoading) {
      return <LinearProgress/>
    }else {
      return <LinearProgress variant="determinate" value={100}/>;
    }
  });

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

    const mobileColumns = useMemo(
      () => [{
          Header: 'Filtered Result(Daily Chart Only)',
          columns: [{
              Header: 'Ticker',
              accessor: 'ticker',
            },{
              Header: 'Open',
              accessor: 'open',
            },{
              Header: 'Close',
              accessor: 'close',
            },{
              Header: 'Change %',
              accessor: 'change',
            }
          ]
      }], []);

  return (
    <div className="app">
      {loader}
      <div className='app__nav-banner'>
        <div className='app__nav-banner__title'>
          Trading Waza  .Beta
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
