import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
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
      adsets,
      updateCampaign,
      profile,
      router: {
        query: { id }
      }
    } = this.props;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign) || !isLoaded(adsets)) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <Typography color="inherit" variant="h3">
                Dashboard
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <SwitchComponent show={isEmpty(adsets)}>
                <Typography>
                  You don't have any adsets! One will be created for you shortly
                </Typography>
              </SwitchComponent>

              <SwitchComponent show={!isEmpty(adsets)}>
                <Typography>[TODO SHOW ADSET DATA]</Typography>
              </SwitchComponent>
            </Grid>
          </Grid>
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
