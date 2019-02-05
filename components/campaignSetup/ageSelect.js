import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const menuItems = [];
for (let i = 13; i < 65; i++) {
  menuItems.push(<MenuItem value={i}>{i}</MenuItem>);
}
menuItems.push(<MenuItem value="65+">65+</MenuItem>);

const AgeSelect = ({ className, label, disabled, value, onChange }) => (
  <FormControl className={className}>
    <InputLabel htmlFor="component-simple">{label}</InputLabel>
    <Select value={value} onChange={onChange} disabled={disabled}>
      {menuItems}
    </Select>
  </FormControl>
);

AgeSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
  handleTextChange: PropTypes.func.isRequired
};

export default AgeSelect;
