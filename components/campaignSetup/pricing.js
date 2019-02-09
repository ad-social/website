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
  Typography
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    padding: 20
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  }
});

const DemographicForm = ({ classes, handleTextChange, ageMin, ageMax, gender }) => (
  <div className={classes.root}>
    <Grid container direction="row" justify="flex-start" spacing={16}>
      <Grid item xs={12}>
        <Typography variant="h4">You're part of the Founders Club!</Typography>
        <Typography variant="subtitle1">
          You don't have to worry about pricing. These ads are on us! We appreciate the early
          support.
        </Typography>
      </Grid>
    </Grid>
  </div>
);

DemographicForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DemographicForm);
