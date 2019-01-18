import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';

import { Grid } from '@material-ui/core';
import withNavBar from '../src/withNavBar';
import EditCampaignStepper from '../components/editCampaignStepper';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  }
});

const NewCampaign = ({ classes }) => (
  <Grid container>
    <Grid item xs={12}>
      <EditCampaignStepper />
    </Grid>
  </Grid>
);

NewCampaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar
)(NewCampaign);
