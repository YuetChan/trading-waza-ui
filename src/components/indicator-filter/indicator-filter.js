import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineFunction } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti'

import './indicator-filter.scss';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import DateAdapter from '@material-ui/lab/AdapterDateFns';
import DatePicker from '@material-ui/lab/DatePicker';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';

import { updateIndicatorPrefix } from '../../tw-redux/actions'

const IndicatorChips = () => {
  const indicatorOpts = useSelector(state => state.indicators);

  const [indicatorChips, setIndicatorChips] = useState([]);
  const [chipsElement, setChipsElement] = useState([]);
  const [date, setDate] = useState(null);

  const dispatch = useDispatch();
  useEffect(() => { dispatch(updateIndicatorPrefix('')); }, []);
  useEffect(() => { resetChipsElement(); }, [indicatorChips]);

  const handleDatePick = (date) => { console.log(date); setDate(date)}
  const handleChipDelete = (key) => () => { setIndicatorChips(Object.assign([], indicatorChips.filter(chip => chip.key !== key))); };
  const handleOptSelect = (opt) => {
    console.log('optSelect called')
    setIndicatorChips(() => {
      let changed = false;

      if(indicatorChips.filter(chip => chip.label === opt).length === 0 && opt.length) {
        const lastIndex = indicatorChips.length - 1;
        const key = lastIndex === -1 ? 0 : indicatorChips[lastIndex].key + 1 ;

        const newChip = { key: key, label: opt };
        indicatorChips.push(newChip);

        changed = true;
      }

      return changed ? Object.assign([], indicatorChips) : indicatorChips;
    });
  }

  const resetChipsElement = () => {
    console.log('resetChipElement called')
    chipsElement.splice(0, chipsElement.length);

    indicatorChips.forEach(chip => {
      chipsElement.push(
        <div className="indicator-filter__chips" key={chip.key}>
          <Chip 
            sx ={{
              fontSize: '13px',
              color: 'rgb(0, 116, 204)',
              backgroundColor: 'rgb(225, 236, 244)'
            }}
            label={chip.label}
            onDelete={handleChipDelete(chip.key)}
            deleteIcon={<TiDeleteOutline/>}
          />
        </div>)
    })

    setChipsElement(Object.assign([], chipsElement))  
  }

  return (
    <div className='indicator-filter'>
      <div className='indicator-filter__date-picker'>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <DatePicker
            label="Date"
            value={date}
            onChange={(val) => { handleDatePick(val); }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </div>

      <div className='indicator-filter__autocomplete'>
        <Autocomplete
          disablePortal
          autoHighlight
          onInputChange={(event, val) => { handleOptSelect(val); }}
          options={indicatorOpts}
          sx={{ 
            width: '211px'
          }}
          renderInput={(params) => <TextField {...params} label="Indicator"/>}
        />
        <AiOutlineFunction className="indicator-filter__autocomplete__icon"/>
      </div>

      <div className='indicator-filter__chips-wrapper'>   
        {chipsElement}
      </div> 
    </div>);
}

export default IndicatorChips;