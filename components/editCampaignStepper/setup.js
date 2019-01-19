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

const objectiveOptions = ['Awareness', 'Drive Traffic to Website'];

const SetupForm = ({ classes, handleChange, campaign, name, objective }) => (
  <div className={classes.root}>
    <Grid container direction="column" spacing={16}>
      <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input id="component-simple" value={campaign.name} onChange={handleChange('name')} />
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Objective</InputLabel>
          <Select
            value={campaign.objective}
            onChange={handleChange('objective')}
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
    </Grid>
  </div>
);

SetupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SetupForm);
