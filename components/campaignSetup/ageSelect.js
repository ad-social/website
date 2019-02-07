import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';

const menuItems = [];
for (let i = 13; i < 65; i++) {
  menuItems.push(
    <MenuItem key={i} value={i}>
      {i}
    </MenuItem>
  );
}
menuItems.push(
  <MenuItem key={65} value="65+">
    65+
  </MenuItem>
);

const AgeSelect = ({ className, value, label, disabled, onChange }) => (
  <FormControl className={className}>
    <InputLabel htmlFor="component-simple">{label}</InputLabel>
    <Select value={value} onChange={onChange} disabled={disabled}>
      {menuItems}
    </Select>
  </FormControl>
);

AgeSelect.propTypes = {
  value: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AgeSelect;
