import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { TiDeleteOutline } from 'react-icons/ti'
import { ImCancelCircle } from 'react-icons/im'

import './indicator-filter.scss';
import { replaceUnderscoreWith, capitalizeBy } from '../../../src/tw-utils/prettier'

import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';

import moment from 'moment';
import 'moment-timezone';

import { updateIndicatorPrefix, updateFilter } from '../../tw-redux/actions'

const IndicatorFilter = () => {
  const handleToggle = (indicator) => () => {
    const currentIdx = indicatorChecks.indexOf(indicator);
    const newChecks = [...indicatorChecks];
    let newIndicatorChips = [];

    if (currentIdx === -1) {
      const lastIndex = indicatorChips.length - 1;
      const key = lastIndex === -1 ? 0 : indicatorChips[lastIndex].key + 1 ;
      const newChip = { key: key, label: indicator };

      indicatorChips.push(newChip);
      newChecks.push(indicator);

      newIndicatorChips = [...indicatorChips];
    } else {
      newIndicatorChips = [... indicatorChips.filter(chip => chip.label !== indicator)];
      newChecks.splice(currentIdx, 1);
    }

    setIndicatorChecks(newChecks);
    setIndicatorChips(newIndicatorChips);
  };

  const [indicatorIncludeds, setIndicatorIncludeds] = useState([]);
  const [indicatorChecks, setIndicatorChecks] = useState([]);
  const [indicatorChips, setIndicatorChips] = useState([]);
  const [chipsElement, setChipsElement] = useState([]);
  const [daysAgo, setDaysAgo] = useState(0);

  const dispatch = useDispatch();
  useEffect(() => { dispatch(updateIndicatorPrefix('')); }, []);
  useEffect(() => { resetChipsElement(); }, [indicatorChips]);

  const indicators = useSelector(state =>  state.indicators);

  const getIndicatorCheckboxes = (indicators) => indicators.sort().map(indicator => {
    const labelId = `checkbox-list-label-${indicator}`;
    return (
        <ListItem
          sx={{
            height: "33px", 
            display: (indicatorIncludeds.indexOf(indicator) !== -1 
            || indicatorIncludeds.length === 0)? "block" : "none" }}
          key={indicator}
          disablePadding
        >
          <ListItemButton 
            sx={{height: "33px"}}
            role={undefined} 
            onClick={handleToggle(indicator)} 
            dense>
            <Checkbox
              sx={{'&.Mui-checked': { color: "rgb(219, 68, 55)"}}}
              edge="start"
              checked={indicatorChecks.indexOf(indicator) !== -1}
              tabIndex={-1}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />

            <ListItemText 
              sx={{color: "rgb(33, 33, 33)"}}
              id={labelId} 
              primary={`${capitalizeBy(replaceUnderscoreWith(indicator, ' '), ' ')}`} />
          </ListItemButton>
        </ListItem>
        );
  })

  const handleDateChange = (event) => { 
    const selectedDateStr = event.target.value;
    const selectedDate = moment(selectedDateStr).toDate();

    const today = moment(moment(new Date()).tz('America/New_York').format("YYYY-MM-DD")).toDate();
    const milisecInDay = 60 * 60 * 24 * 1000;

    setDaysAgo((today - selectedDate) / milisecInDay);
  }

  const handleChipDelete = (key, label) => () => { 
    const currentIdx = indicatorChecks.indexOf(label);
    const newChecks = [...indicatorChecks];
    newChecks.splice(currentIdx, 1);
    
    setIndicatorChecks(newChecks);
    setIndicatorChips(Object.assign([], indicatorChips.filter(chip => chip.key !== key))); 
  };

  const handlePrefixChange = (event) => {
    const prefix = event.target.value.toLowerCase();
    if(prefix === '') {
      setIndicatorIncludeds([...indicators]);
    }else {
      const includeds = indicators.filter(indicator => {
        return replaceUnderscoreWith(indicator, ' ').toLowerCase().includes(prefix)
      });
    
      setIndicatorIncludeds([...includeds]);
    }
  }

  const handleSearch = () => { dispatch(updateFilter(daysAgo, indicatorChecks)); }

  const resetChipsElement = () => {
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
            label={capitalizeBy(replaceUnderscoreWith(chip.label, ' '), ' ')}
            onDelete={handleChipDelete(chip.key, chip.label)}
            deleteIcon={<TiDeleteOutline/>}
          />
        </div>)
    })

    setChipsElement(Object.assign([], chipsElement))  
  }

  return (
    <div className='indicator-filter'>
      <div className='indicator-filter__autocomplete'>
        <div className='indicator-filter__autocomplete__header'>
          <h3>Filter Settings </h3>
          {/* Potential Feature!! */}
          {/* <div onClick={} className='indicator-filter__autocomplete__header__cancel-icon'>
            <ImCancelCircle/>
          </div> */}
        </div>
        
        <div className='indicator-filter__date-picker'>

          <TextField
            sx={{width: "100%"}}
            onChange={handleDateChange}
            id="date-picker"
            defaultValue={moment().tz('America/New_York').format("YYYY-MM-DD")}
            type="date"
            InputProps={{
              endAdornment: <InputAdornment position="end">EST</InputAdornment>,
            }}
          />
        </div>

        <div className="indicator-filter__autocomplete__search">
          <TextField 
            sx={{width: "100%"}}
            label="Indicator Prefix"
            onChange={handlePrefixChange}
          />
        </div>

        <div class="indicator-filter__autocomplete__checkboxes">
          <List sx={{width: '267px'}}>
            {getIndicatorCheckboxes(indicators)}
          </List>
        </div>

        <br></br>
        <Button variant="outlined" onClick={handleSearch}>Search</Button>
      </div>

      <br></br>

      <div className='indicator-filter__chips-wrapper'>   
        {chipsElement}
      </div> 
    </div>);
}

export default IndicatorFilter;