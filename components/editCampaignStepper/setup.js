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
  }
});

const objectiveOptions = [
  'Brand awareness',
  'Reach',
  'Traffic',
  'Engagement',
  'App installs',
  'Conversions',
  'Store visits'
];

const SetupForm = ({ classes, handleTextChange, handleCheckboxChange, campaign }) => (
  <div className={classes.root}>
    <Grid container direction="row" spacing={16}>
      <Grid item xs={7}>
        {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input id="component-simple" value={campaign.name} onChange={handleChange('name')} />
        </FormControl> */}

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
          <RadioGroup
            aria-label="position"
            name="position"
            value={campaign.scheduling}
            onChange={handleTextChange('scheduling')}
            row
          >
            <FormControlLabel
              value="continuous"
              control={<Radio color="secondary" />}
              label="Continuous"
              labelPlacement="end"
            />
            <FormControlLabel
              value="specificSchedule"
              control={<Radio color="secondary" />}
              label="Specific Schedule"
              labelPlacement="end"
            />
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  </div>
);

SetupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SetupForm);
