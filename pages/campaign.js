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
  ExpansionPanelDetails
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import withNavBar from '../src/withNavBar';
import EditCampaignStepper from '../components/editCampaignStepper';
import CampaignHeader from '../components/campaignHeader';
import CampaignSummary from '../components/campaignSummary';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class Campaign extends React.Component {
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
      router: {
        query: { id }
      }
    } = this.props;
    const { status } = campaign;

    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12} sm={10}>
            <Grid item xs={12}>
              <CampaignHeader campaign={campaign} />
            </Grid>
            <Grid item xs={12}>
              {/* {this.renderCampaignBody()} */}
              <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Campaign Details</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  {status === 'incomplete' ? (
                    <EditCampaignStepper {...{ campaign, updateCampaign }} />
                  ) : (
                    <CampaignSummary {...{ campaign, updateCampaign }} />
                  )}
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel disabled={status !== 'review'}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Review</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    We're reviewing your campaign now! We'll get back to you within 48 hours with
                    free consultation advice.
                  </Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel disabled>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography className={classes.heading}>Pick Your Ad</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
                    lacus ex, sit amet blandit leo lobortis eget.
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

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withNavBar,
  firestoreConnect(props => [{ collection: 'campaigns', doc: props.router.query.id }]),
  connect(({ firestore: { data } }, { router: { query: { id } } }) => ({
    campaign: data.campaigns && data.campaigns[id]
  })),
  withHandlers({
    updateCampaign: props => updates =>
      props.firestore.update({ collection: 'campaigns', doc: props.router.query.id }, updates)
  }),
  withStyles(styles)
)(Campaign);
