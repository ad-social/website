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

class CampaignSetup extends React.Component {
  state = {};

  renderCampaignBody = () => {
    const { campaign, updateCampaign } = this.props;
    switch (campaign.status) {
      case 'incomplete':
        return <EditCampaignStepper {...{ campaign, updateCampaign }} />;
      case 'review':
        return <CampaignSummary {...{ campaign, updateCampaign }} />;
      default:
        return null;
    }
  };

  /**
   * ADMIN CONTROL
   * Puts campaign past the review stage
   */
  passCampaignReview = () => {
    const { updateCampaign, createNewAdset } = this.props;
    updateCampaign({ passedReview: true, status: 2 });
    createNewAdset({ status: 'creating' });
  };

  render() {
    const { classes, campaign, updateCampaign, profile } = this.props;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    // const status = parseStatus(campaign.status);
    const { status } = campaign;

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <Typography color="inherit" variant="h3">
                Setup
              </Typography>
            </Grid>
            <Grid item xs={12}>
              {/* {this.renderCampaignBody()} */}
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Campaign Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {status === 0 ? (
                    <EditCampaignStepper {...{ campaign, updateCampaign }} />
                  ) : (
                    <CampaignSummary {...{ campaign, updateCampaign }} />
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel disabled={status < 1}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Review</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {status === 1 ? (
                    <Typography>
                      We're reviewing your campaign now! We'll get back to you within 48 hours with
                      free consultation advice.
                    </Typography>
                  ) : (
                    <Typography>
                      We've looked over your campaign and it looks great! You're ready to pick your
                      ad!
                    </Typography>
                  )}

                  <SwitchComponent
                    show={profile.isAdmin === true && campaign.passedReview === false}
                  >
                    <SpecialButton onClick={this.passCampaignReview}>Pass</SpecialButton>
                  </SwitchComponent>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

CampaignSetup.propTypes = {
  classes: PropTypes.object.isRequired,
  campaign: PropTypes.object.isRequired,
  updateCampaign: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withStyles(styles)
)(CampaignSetup);
