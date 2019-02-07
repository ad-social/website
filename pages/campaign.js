import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { CircularProgress } from '@material-ui/core';
import withResponsiveDrawerNavbar from '../src/withResponsiveDrawerNavbar';
import CampaignSetup from '../components/campaignSetup';
import CampaignDashboard from '../components/campaignDashboard';
import CampaignAnalytics from '../components/campaignAnalytics';

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
      case 'setup':
        return <CampaignSetup {...this.props} />;
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

    return <div className={classes.root}>{this.renderContent()}</div>;
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  firestoreConnect(props => {
    console.log('CAMPAIGN ID: ', props.router.query.campaignId);
    return [
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
    ];
  }),
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
      adsets: data.adsets,
      profile
    })
  ),
  withHandlers({
    updateCampaign: props => updates =>
      props.firestore.update(
        { collection: 'campaigns', doc: props.router.query.campaignId },
        updates
      ),
    updateAdset: props => id => updates => {
      props.firestore.update(
        {
          collection: 'campaigns',
          doc: props.router.query.campaignId,
          subcollections: [{ collection: 'adsets', doc: id }]
        },
        updates
      );
    },

    createNewAdset: props => adset => {
      props.firestore.add(
        {
          collection: 'campaigns',
          doc: props.router.query.campaignId,
          subcollections: [{ collection: 'adsets' }]
        },
        adset
      );
    }
  }),
  withStyles(styles),
  withResponsiveDrawerNavbar
)(Campaign);
