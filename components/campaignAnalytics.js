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
import CampaignHeader from './campaignHeader';
import CampaignSummary from './campaignSummary';
import SwitchComponent from './switchComponent';
import SpecialButton from './specialButton';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class CampaignAnalytics extends React.Component {
  state = {};

  render() {
    const { classes, campaign, analytics } = this.props;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <Typography color="inherit" variant="h3">
                Analytics
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <SwitchComponent show={isEmpty(analytics)}>
                <Typography variant="subtitle1">
                  Analytics aren't setup for this campaign yet. You need to deploy an adset before
                  you start seeing analytics.
                </Typography>
              </SwitchComponent>

              <SwitchComponent show={!isEmpty(analytics)}>
                {/* FOR MVP ONLY SHOW 1 (FIRST) ADSET */}
                {/* <AdSet adset={analytics[Object.keys(analytics)[0]]} /> */}
              </SwitchComponent>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CampaignAnalytics.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(CampaignAnalytics);
