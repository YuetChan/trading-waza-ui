import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './indicator-chips.scss';

import { AiOutlineFunction } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import DateAdapter from '@material-ui/lab/AdapterDateFns';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import { updateIndicatorPrefix } from '../../redux/tw-actions'

const IndicatorChips = () => {
  const dispatch = useDispatch();

  const indicators = useSelector(state => state.indicators);

  const [indicatorOpts, setIndicatorOpts] = useState(useSelector(state => state.indicators));
  const [chipData, setChipData] = useState([{key: 1, label: 'Bullish Engulfing'}, {key: 2, label: 'Bearish Engulfing'}]);
  const [value, setValue] = useState(null);

  useEffect(() => {
    console.log(indicators);
  }, [indicators])

  const handleDelete = (key) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== key));
    dispatch(updateIndicatorPrefix(''));
  };

  const chips = [];
  for(const {key, label} of chipData) {
    chips.push(
      <div class="indicator-chips__chips">
        <Chip 
          sx ={{
            fontSize: '13px',
            color: 'rgb(0, 116, 204)',
            backgroundColor: 'rgb(225, 236, 244)'
          }}
          label={label}
          onDelete={handleDelete(key)}
          deleteIcon={<TiDeleteOutline/>}
        />
      </div>)
  }

  return (
    <div class='indicator-chips'>
      <div class='indicator-chips__date-picker'>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Date"
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div class='indicator-chips__autocomplete'>
        <Autocomplete
          disablePortal
          options={indicatorOpts}
          sx={{ 
            width: '211px'
          }}
          renderInput={(params) => <TextField {...params} label="Indicator"/>}
        />
        <AiOutlineFunction class="indicator-chips__autocomplete__icon"/>
      </div>

      <div class='indicator-chips__chips-wrapper'>   
        {chips}
      </div> 
    </div>);
}

export default IndicatorChips;