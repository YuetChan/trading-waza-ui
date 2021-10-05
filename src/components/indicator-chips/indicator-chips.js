import * as React from 'react';
import './indicator-chips.scss';

import { AiOutlineFunction } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import DateAdapter from '@material-ui/lab/AdapterDateFns';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

const IndicatorChips = () => {
  const [chipData, setChipData] = React.useState([
    { key: 0, label: 'Td 9 Top' },
    { key: 1, label: 'SMA 20/50/200 Cross' },
    { key: 2, label: 'SMA 20/50/100 Cross' },
    { key: 3, label: 'Bullish Engulfing' },
    { key: 4, label: 'Bearish Engulfing' },
  ]);

  const [value, setValue] = React.useState(null);

  const handleDelete = (key) => () => {
    setChipData((chips) => chips.filter((chip) => chip.key !== key));
  };

  const testOptions = [
    { label: 'Td 9 Top' },
    { label: 'SMA 20/50/100 Cross' },
    { label: 'SMA 20/50/200 Cross' },
  ]

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
          options={testOptions}
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