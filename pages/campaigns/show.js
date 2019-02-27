import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { CircularProgress, Grid } from '@material-ui/core';
import withResponsiveDrawerNavbar from '../../src/withResponsiveDrawerNavbar';
import CampaignStrategyStatement from '../../components/campaignStrategyStatement';
import CampaignDashboard from '../../components/campaignDashboard';
import CampaignAnalytics from '../../components/campaignAnalytics';
import FirestoreFunctions from '../../src/firestoreFunctions';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class Campaign extends React.Component {
  state = {};

  renderContent = () => {
    const { page } = this.props;
    switch (page) {
      case 'strategy':
        return <CampaignStrategyStatement {...this.props} />;
      case 'dashboard':
        return <CampaignDashboard {...this.props} />;
      case 'analytics':
        return <CampaignAnalytics {...this.props} />;
      default:
        return null;
    }
  };

  render() {
    const { classes, campaign, updateCampaign, profile, page } = this.props;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <Grid container className={classes.root}>
        {this.renderContent()}
      </Grid>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  firestoreConnect(props => [
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      storeAs: 'campaign'
    },
    {
      collection: 'campaigns',
      doc: props.router.query.campaignId,
      subcollections: [{ collection: 'adsets' }],
      storeAs: 'adsets'
    }
  ]),
  connect(
    (
      { firestore: { data }, firebase: { profile } },
      {
        router: {
          query: { campaignId }
        }
      }
    ) => ({
      campaign: data.campaign,
      adsets: data.adsets || [],
      profile
    })
  ),
  withHandlers({
    updateCampaign: props => updates =>
      props.firestore.update(
        { collection: 'campaigns', doc: props.router.query.campaignId },
        updates
      ),
    updateAdset: props => adsetId => updates => {
      props.firestore.update(
        {
          collection: 'campaigns',
          doc: props.router.query.campaignId,
          subcollections: [{ collection: 'adsets', doc: adsetId }]
        },
        updates
      );
    },
    submitCampaignForReview: props => {
      props.firestore.update(
        { collection: 'campaigns', doc: props.router.query.campaignId },
        {
          submittedForReview: true
        }
      );
    },
    passCampaignReview: FirestoreFunctions.PassCampaignReview,
    denyCampaignReview: FirestoreFunctions.DenyCampaignReview,
    CreateNewAdset: FirestoreFunctions.CreateNewAdset,
    AddNewVersionToAdset: FirestoreFunctions.AddNewVersionToAdset,
    acceptAdsetVersion: FirestoreFunctions.AcceptAdsetVersion,
    denyAdsetVersion: FirestoreFunctions.DenyAdsetVersion
  }),
  withStyles(styles),
  withResponsiveDrawerNavbar
)(Campaign);
