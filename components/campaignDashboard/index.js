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

import Adset from './adset';
import SwitchComponent from '../switchComponent';

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
      addNewVersionToAdset,
      acceptAdsetVersion,
      updateAdset,
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
                <Typography variant="subtitle1">
                  You don't have any adsets! One will be created for you shortly
                </Typography>
              </SwitchComponent>

              <SwitchComponent show={!isEmpty(adsets)}>
                {/* SHOW 1 (FIRST) FOR MVP ONLY ADSET */}
                {Object.keys(adsets).map(adsetId => (
                  <Adset
                    // Give all props
                    {...this.props}
                    // Overrides
                    adset={adsets[adsetId]}
                    id={adsetId}
                    updateAdset={updateAdset(adsetId)}
                  />
                ))}
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
