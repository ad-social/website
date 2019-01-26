import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import {
  CircularProgress,
  Typography,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Button
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { parseStatus } from '../src/utils';
import withNavBar from '../src/withNavBar';
import withResponsiveDrawerNavbar from '../src/withResponsiveDrawerNavbar';
import EditCampaignStepper from '../components/editCampaignStepper';
import CampaignHeader from '../components/campaignHeader';
import CampaignSummary from '../components/campaignSummary';
import SwitchComponent from '../components/switchComponent';
import SpecialButton from '../components/specialButton';
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

    console.log('Page: ', page);

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    // const status = parseStatus(campaign.status);
    const { status } = campaign;

    /**
     * ADMIN CONTROL
     * Puts campaign past the review stage
     */
    const passCampaignReview = () => {
      updateCampaign({ passedReview: true, status: 2 });
    };

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          {this.renderContent()}
        </Grid>
      </div>
    );
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  firestoreConnect(props => [{ collection: 'campaigns', doc: props.router.query.campaignId }]),
  connect(
    (
      { firestore: { data }, firebase: { profile } },
      {
        router: {
          query: { campaignId }
        }
      }
    ) => ({
      campaign: data.campaigns && data.campaigns[campaignId],
      profile
    })
  ),
  withHandlers({
    updateCampaign: props => updates =>
      props.firestore.update(
        { collection: 'campaigns', doc: props.router.query.campaignId },
        updates
      )
  }),
  withResponsiveDrawerNavbar,
  withStyles(styles)
)(Campaign);
