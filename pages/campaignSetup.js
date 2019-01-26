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
          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <Typography color="inherit" variant="h3">
                Overview
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
                    <SpecialButton onPress={this.passCampaignReview}>Pass</SpecialButton>
                  </SwitchComponent>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel disabled={status < 2}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Craft Your Ad</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Your ad is in the works! We'll get it to you within 72 hours. If you don't like
                    it you will be able to make 2 free revisions.
                  </Typography>
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
)(CampaignSetup);
