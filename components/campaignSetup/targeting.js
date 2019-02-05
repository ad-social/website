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
  TextField
} from '@material-ui/core';
import AgeSelect from './ageSelect';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  },
  ageFormControl: {
    margin: theme.spacing.unit,
    width: 200
  }
});

const ageInputFilter = (prop, callback) => event => {
  if (event.target.value > 0) {
    callback(prop)(event);
  }
};

const TargetingForm = ({ classes, disabled, handleTextChange, campaign }) => (
  <div className={classes.root}>
    <Grid container direction="row" justify="flex-start" spacing={16}>
      <Grid item xs={12}>
        <Grid container direction="row">
          <Grid item xs={12}>
            <AgeSelect
              className={classes.ageFormControl}
              label="Age Min"
              value={campaign.ageMin}
              onChange={handleTextChange('ageMin')}
              disabled={disabled}
            />
            <AgeSelect
              className={classes.ageFormControl}
              label="Age Max"
              value={campaign.ageMax}
              onChange={handleTextChange('ageMax')}
              disabled={disabled}
            />
            {/* <FormControl className={classes.ageFormControl}>
              <InputLabel htmlFor="component-simple">Age Minimum</InputLabel>
              <Input
                id="component-simple"
                type="number"
                value={campaign.ageMin}
                onChange={ageInputFilter('ageMin', handleTextChange)}
                disabled={disabled}
              />
            </FormControl>
            <FormControl className={classes.ageFormControl}>
              <InputLabel htmlFor="component-simple">Age Maximum</InputLabel>
              <Input
                id="component-simple"
                type="number"
                value={campaign.ageMax}
                onChange={ageInputFilter('ageMax', handleTextChange)}
                disabled={disabled}
              />
            </FormControl> */}
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Gender</InputLabel>

              <Select
                value={campaign.gender}
                onChange={handleTextChange('gender')}
                inputProps={{
                  name: 'objective',
                  id: 'objective-simple'
                }}
                disabled={disabled}
              >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <TextField
          id="outlined-multiline-flexible"
          label="Describe your target audience (Be specific!)"
          multiline
          fullWidth
          rowsMax="4"
          value={campaign.targetingDescription}
          onChange={handleTextChange('targetingDescription')}
          className={classes.textField}
          margin="normal"
          variant="outlined"
          disabled={disabled}
        />
      </Grid>
    </Grid>
  </div>
);

TargetingForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(TargetingForm);
