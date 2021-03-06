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
  Button,
  Paper,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  TextField,
  InputAdornment
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { parseStatus } from '../../src/utils';
import withNavBar from '../../src/withNavBar';
import withResponsiveDrawerNavbar from '../../src/withResponsiveDrawerNavbar';
import CampaignHeader from '../campaignHeader';
import CampaignSummary from '../campaignSummary';
import SwitchComponent from '../switchComponent';
import SpecialButton from '../specialButton';
import Setup from './setup';
import Targeting from './targeting';
import Pricing from './pricing';
import ChipInput from './chipInput';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  titleContainer: {
    marginBottom: theme.spacing.unit * 4
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  textField: {
    width: '100%'
  }
});

class CampaignSetup extends React.Component {
  state = {};

  renderCampaignBody = () => {
    const { campaign, updateCampaign } = this.props;
    switch (campaign.status) {
      case 'incomplete':
        return null;
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
    updateCampaign({ passedReview: true, status: 'complete' });
    // TODO - do this server side
    createNewAdset({ name: 'Adset 1' });
  };

  /**
   * Submit the campaign for review
   */

  submitForReview = () => {
    const { updateCampaign } = this.props;
    updateCampaign({ status: 'complete' });
  };

  /**
   * Handles any changes to state from a text value
   */
  handleTextChange = prop => event => {
    const { updateCampaign } = this.props;
    updateCampaign({
      [prop]: event.target.value
    });
  };

  /**
   * Handles any changes to state from a text value
   */
  handleDateChange = prop => date => {
    const { updateCampaign } = this.props;
    updateCampaign({
      [prop]: date
    });
  };

  /**
   * Handles changes from a checkbox
   */
  handleCheckboxChange = prop => event => {
    const { updateCampaign } = this.props;
    updateCampaign({
      [prop]: event.target.checked
    });
  };

  render() {
    const { classes, campaign, updateCampaign, profile } = this.props;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    const { status } = campaign;

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={12} sm={10}>
            <Grid item xs={12} className={classes.titleContainer}>
              <Typography color="inherit" variant="h3">
                Setup
              </Typography>
              <Typography color="inherit" variant="subtitle1" gutterBottom>
                Tell us about your campaign, what you'd like to acheive, how much you'd like to
                spend, etc. We'll review the information and make sure everything is good to go!
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                  Platforms, Objective and Scheduling
                </Typography>

                <Setup
                  campaign={campaign}
                  handleTextChange={this.handleTextChange}
                  handleCheckboxChange={this.handleCheckboxChange}
                  handleDateChange={this.handleDateChange}
                  disabled={!(status === 'incomplete')}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                  Budget
                </Typography>
                <br />
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">
                    How much would you like to spend over the course of your campaign?
                  </FormLabel>
                  <br />
                  <TextField
                    label="Campaign Budget"
                    type="number"
                    value={campaign.budget}
                    className={classes.textField}
                    onChange={this.handleTextChange('budget')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>
                    }}
                    disabled={!(status === 'incomplete')}
                  />
                </FormControl>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                  Targeting
                </Typography>

                <Targeting
                  campaign={campaign}
                  updateCampaign={updateCampaign}
                  handleTextChange={this.handleTextChange}
                  handleCheckboxChange={this.handleCheckboxChange}
                  disabled={!(status === 'incomplete')}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                  Target Audience Interests
                </Typography>

                <ChipInput
                  campaign={campaign}
                  updateCampaign={updateCampaign}
                  prop="audienceInterests"
                  label="Add Audience Interests"
                  disabled={!(status === 'incomplete')}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                  Location(s)
                </Typography>

                <ChipInput
                  campaign={campaign}
                  updateCampaign={updateCampaign}
                  prop="locations"
                  label="Add Locations"
                  disabled={!(status === 'incomplete')}
                />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Typography variant="h5" component="h3">
                  Pricing
                </Typography>

                <Pricing
                  campaign={campaign}
                  handleTextChange={this.handleTextChange}
                  handleCheckboxChange={this.handleCheckboxChange}
                  disabled={!(status === 'incomplete')}
                />
              </Paper>
            </Grid>

            {/* Only non-admins can submit for review */}
            <SwitchComponent
              show={
                (!profile.isAdmin || profile.isAdmin === false) && campaign.status === 'incomplete'
              }
            >
              <SpecialButton onClick={this.submitForReview}>Submit For Review</SpecialButton>
            </SwitchComponent>

            {/* Only admins can pass the review */}
            <SwitchComponent
              show={
                profile.isAdmin === true &&
                (!campaign.passedReview || campaign.passedReview === false)
              }
            >
              <SpecialButton onClick={this.passCampaignReview}>Pass Review</SpecialButton>
            </SwitchComponent>
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
