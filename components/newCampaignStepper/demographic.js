import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { FormControl, Input, InputLabel, Grid, Select, MenuItem } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  }
});

const DemographicForm = ({ classes, handleChange, ageMin, ageMax, gender }) => (
  <div className={classes.root}>
    <Grid container direction="row" justify="flex-start" spacing={16}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Age Minimum</InputLabel>
              <Input id="component-simple" type="number" value={ageMin} onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Age Maximum</InputLabel>
              <Input id="component-simple" type="number" value={ageMax} onChange={handleChange} />
            </FormControl>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={6}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="component-simple">Gender</InputLabel>

              <Select
                value={gender}
                onChange={handleChange}
                inputProps={{
                  name: 'objective',
                  id: 'objective-simple'
                }}
              >
                <MenuItem value="any">Any</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </div>
);

DemographicForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DemographicForm);
