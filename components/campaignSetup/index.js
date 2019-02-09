import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { withRouter } from 'next/router';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { isLoaded } from 'react-redux-firebase';
import {
  CircularProgress,
  Typography,
  Grid,
  Paper,
  FormControl,
  FormLabel,
  TextField,
  InputAdornment
} from '@material-ui/core';
import classNames from 'classnames';

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
  errorPaper: {
    backgroundColor: theme.palette.error.light,
    color: 'white'
  },
  textField: {
    width: '100%'
  }
});

class CampaignSetup extends React.Component {
  state = {
    reviewDenialReason: ''
  };

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
    updateCampaign({ reviewPassed: true, status: 'complete' });
    // TODO - do this server side
    createNewAdset('Adset 1');
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
    const {
      classes,
      campaign,
      updateCampaign,
      submitCampaignForReview,
      denyCampaignReview,
      profile
    } = this.props;
    // Parse variables from campaign
    const { submittedForReview, reviewDenied, reviewDenialReason } = campaign;
    // Whether the fields should be disabled or not
    const disabled = submittedForReview;

    // Make sure the campaign is loaded
    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

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
            <SwitchComponent show={reviewDenied}>
              <Grid item xs={12}>
                <Paper className={classNames(classes.paper, classes.errorPaper)}>
                  <Typography color="inherit" variant="h5">
                    Campaign did not pass review
                  </Typography>
                  <Typography color="inherit" variant="subtitle1" gutterBottom>
                    {reviewDenialReason}
                  </Typography>
                </Paper>
              </Grid>
            </SwitchComponent>

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
                    disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
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
                  disabled={disabled}
                />
              </Paper>
            </Grid>

            {/* Only non-admins can submit for review */}
            <SpecialButton onClick={submitCampaignForReview}>Submit For Review</SpecialButton>

            <br />

            {/* Only admins can pass the review */}
            <SwitchComponent
              show={
                profile.isAdmin === true &&
                (!campaign.reviewPassed || campaign.reviewPassed === false)
              }
            >
              <TextField
                id="outlined-textarea"
                label="Review Denial Reason"
                placeholder="Why is this review getting denied?"
                multiline
                className={classes.textField}
                margin="normal"
                variant="outlined"
                onChange={event => this.setState({ reviewDenialReason: event.target.value })}
              />
              <SpecialButton onClick={() => denyCampaignReview(this.state.reviewDenialReason)}>
                Deny Review
              </SpecialButton>
              <br />
              <br />
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
