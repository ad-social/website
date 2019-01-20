import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});
const CampaignSummary = ({ classes }) => (
  <div className={classes.root}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Paper>asdf</Paper>
      </Grid>
    </Grid>
  </div>
);

CampaignSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignSummary);
