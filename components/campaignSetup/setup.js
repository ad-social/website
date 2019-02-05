import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  RadioGroup,
  Radio
} from '@material-ui/core';
import { DatePicker } from 'material-ui-pickers';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  datePicker: {
    paddingRight: 20
  }
});

const objectiveOptions = [
  'Brand awareness',
  'Reach',
  'Traffic',
  'Engagement',
  'App installs',
  'Lead Generation',
  'Conversions',
  'Store visits'
];

const SetupForm = ({
  classes,
  disabled,
  handleTextChange,
  handleCheckboxChange,
  handleDateChange,
  campaign
}) => (
  <div className={classes.root}>
    <Grid container direction="row" spacing={16}>
      <Grid item xs={7}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Platform(s)</FormLabel>
          <FormGroup row>
            <FormControlLabel
              control={
                <Checkbox
  checked={campaign.facebook}
  onChange={handleCheckboxChange('facebook')}
  value="facebook"
/>
              }
              label="Facebook"
              disabled={disabled}
            />
            <FormControlLabel
              control={
                <Checkbox
  checked={campaign.instagram}
  onChange={handleCheckboxChange('instagram')}
  value="instagram"
/>
              }
              label="Instagram"
              disabled={disabled}
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={7}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Objective</InputLabel>
          <Select
            value={campaign.objective}
            onChange={handleTextChange('objective')}
            inputProps={{
              name: 'objective',
              id: 'objective-simple'
            }}
            disabled={disabled}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {objectiveOptions.map(objectiveOption => (
              <MenuItem value={objectiveOption}>{objectiveOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={7}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Ad Scheduling</FormLabel>
          <Grid container direction="row">
            <Grid item xs={6}>
              <DatePicker
                margin="normal"
                className={classes.datePicker}
                label="Start Date"
                value={(campaign.endDate && new Date(campaign.startDate.toDate())) || new Date()}
                onChange={handleDateChange('startDate')}
              />
            </Grid>
            <Grid item xs={6}>
              <DatePicker
                margin="normal"
                label="End Date"
                className={classes.datePicker}
                value={(campaign.endDate && new Date(campaign.endDate.toDate())) || new Date()}
                onChange={handleDateChange('endDate')}
              />
            </Grid>
          </Grid>
        </FormControl>
      </Grid>
    </Grid>
  </div>
);

SetupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SetupForm);
