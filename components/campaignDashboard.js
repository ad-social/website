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
import EditCampaignStepper from './editCampaignStepper';
import CampaignHeader from './campaignHeader';
import CampaignSummary from './campaignSummary';
import SwitchComponent from './switchComponent';
import SpecialButton from './specialButton';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class CampaignDashboard extends React.Component {
  state = {};

  render() {
    const {
      classes,
      campaign,
      updateCampaign,
      profile,
      router: {
        query: { id }
      }
    } = this.props;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    // const status = parseStatus(campaign.status);
    const { status } = campaign;

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          Dashboard
        </Grid>
      </div>
    );
  }
}

CampaignDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(CampaignDashboard);
