import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

const AdSet = ({ classes, adset }) => {
  const { status } = adset;

  if (status === 'incomplete') {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            We're working on your adset right now! We'll send you an email when it's done and you'll
            be able to see it here
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return <div> hello world! </div>;
};

AdSet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(AdSet);
