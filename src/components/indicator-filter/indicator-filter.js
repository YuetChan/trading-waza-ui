import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsSearch } from 'react-icons/bs';
import { TiDeleteOutline } from 'react-icons/ti'

import './indicator-filter.scss';
import { replaceUnderscoreWith, capitalizeBy } from '../../../src/tw-utils/prettier'

import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import TextField from '@mui/material/TextField';

import { updateIndicatorPrefix } from '../../tw-redux/actions'

const IndicatorChips = () => {

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
  const [date, setDate] = useState(null);

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

  const handleDatePick = (date) => { console.log(date); setDate(date)}
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
      const includeds = indicators.filter(indicator => replaceUnderscoreWith(indicator, ' ').includes(prefix));
      setIndicatorIncludeds([...includeds]);
    }
  }

  const handleSearchClick = () => {
    dispatch(updateIndicatorPrefix(''));
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
      <div className='indicator-filter__date-picker'>
        <TextField
          label="Date"
          id="date-picker"
          sx={{ width: '100%' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">EST</InputAdornment>,
          }}
        />
      </div>

      <div className='indicator-filter__autocomplete'>
        <div className="indicator-filter__autocomplete">
          <div className="indicator-filter__autocomplete__search">
            <TextField 
              sx={{width: "227px"}}
              label="Indicator Prefix"
              onChange={handlePrefixChange}
             />
            <IconButton >
              <BsSearch className="indicator-filter__autocomplete__btn"/>
            </IconButton>
          </div>

          <div class="indicator-filter__autocomplete__checkboxes">
            <List sx={{width: '267px'}}>
              {getIndicatorCheckboxes(indicators)}
            </List>
          </div>
        </div>

      </div>

      <div className='indicator-filter__chips-wrapper'>   
        {chipsElement}
      </div> 
    </div>);
}

export default IndicatorChips;