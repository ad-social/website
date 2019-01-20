import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { Grid } from '@material-ui/core';
import NextButton from './nextButton';
import SetupForm from './setup';
import TargetingForm from './targeting';
import PricingForm from './pricing';

const styles = theme => ({
  root: {
    width: '100%'
  },
  button: {
    marginRight: theme.spacing.unit
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit
  },
  stepContent: {
    backgroundColor: 'white',
    height: 500
  }
});

function getSteps() {
  return ['Setup', 'Targeting', 'Pricing'];
}

class NewCampaignStepper extends React.Component {
  /**
   * Get content for each step
   */
  getStepContent(step) {
    const { campaign } = this.props;

    switch (step) {
      case 0:
        return (
          <SetupForm
            campaign={campaign}
            handleTextChange={this.handleTextChange}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        );
      case 1:
        return (
          <TargetingForm
            campaign={campaign}
            handleTextChange={this.handleTextChange}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        );
      case 2:
        return (
          <PricingForm
            campaign={campaign}
            handleTextChange={this.handleTextChange}
            handleCheckboxChange={this.handleCheckboxChange}
          />
        );
      default:
        return 'Describe the Audience';
    }
  }

  /**
   * Move to the next section in the stepper
   */
  handleNext = () => {
    const { campaign, updateCampaign } = this.props;
    updateCampaign({ activeStep: campaign.activeStep + 1 });
  };

  /**
   * Move back a section in the stepper
   */
  handleBack = () => {
    const { campaign, updateCampaign } = this.props;
    updateCampaign({ activeStep: campaign.activeStep - 1 });
  };

  /**
   * Move campaign into review status
   */
  handleSubmit = () => {
    const { campaign, updateCampaign } = this.props;
    updateCampaign({ status: 'review' });
  };

  /**
   * Reset the stepper and go back to the beginning
   */
  handleReset = () => {};

  /**
   * Handles any changes to state
   */
  handleTextChange = prop => event => {
    const { updateCampaign } = this.props;
    updateCampaign({
      [prop]: event.target.value
    });
  };

  handleCheckboxChange = prop => event => {
    const { updateCampaign } = this.props;
    updateCampaign({
      [prop]: event.target.checked
    });
  };

  render() {
    const { classes, campaign } = this.props;
    const steps = getSteps();
    let { activeStep } = campaign;

    // Sanitize active step
    if (!activeStep) {
      campaign.activeStep = 0;
      activeStep = 0;
    }

    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
              </Button>
            </div>
          ) : (
            <Grid container spacing={16}>
              <Grid item xs={12} className={classes.stepContent}>
                {this.getStepContent(activeStep)}
              </Grid>
              <Grid container justify="space-between" spacing={16}>
                <Grid item>
                  <Button
                    disabled={activeStep === 0}
                    onClick={this.handleBack}
                    className={classes.button}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid item>
                  <NextButton
                    {...{
                      activeStep,
                      steps,
                      handleNext: this.handleNext,
                      handleSubmit: this.handleSubmit
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          )}
        </div>
      </div>
    );
  }
}

NewCampaignStepper.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewCampaignStepper);

/**
 * Setup
 * - Platform
 * - Objective (relative to the platform)
 * - Ad Scheduiling (run all the time or on a schedule)
 * Pricing
 * - Early stage start up
 * - Part of founders club
 * - submit for FREE consultation
 */
