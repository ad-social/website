import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Router from 'next/router';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { withFirestore, firestoreConnect, isLoaded } from 'react-redux-firebase';
import withNavBar from '../src/withNavBar';
import CampaignsTable from '../components/campaignsTable';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 30
  }
};

const Dashboard = ({ classes, campaigns }) => {
  const onNewCampaignClick = () => {
    Router.push('/newCampaign');
  };

  return (
    <Grid container direction="column" alignItems="center" className={classes.root} spacing={16}>
      <Grid item xs={12}>
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={onNewCampaignClick}
        >
          Start A New Campaign
        </Button>
      </Grid>
      <Grid item xs={6}>
        <CampaignsTable campaigns={campaigns} />
      </Grid>
    </Grid>
  );
};

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavBar,
  connect(({ firestore: { ordered }, firebase: auth }) => ({
    campaigns: ordered.campaigns,
    auth
  })),
  firestoreConnect(({ auth }) => [
    { collection: 'campaigns', owner: auth.uid } // or `todos/${props.todoId}`
  ]),
  withStyles(styles)
)(Dashboard);
