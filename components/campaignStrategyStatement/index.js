import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Switch, Paper } from '@material-ui/core';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import Section from './section';

import FirestoreFunctions from '../../src/firestoreFunctions';
import {
  StrategyStatementBusinessFields,
  StrategyStatementPositioningFields,
  StrategyStatementTargetingFields,
  StrategyExtraInfoFields
} from '../../src/campaignMetaData';
import SwitchComponent from '../switchComponent';

const styles = theme => ({
  adminControlsSection: {
    padding: '1em'
  }
});

class CampaignStrategyStatement extends React.Component {
  state = {};

  toggleIsReadyForUser = () => {
    const { campaign, updateCampaignStrategyStatement } = this.props;
    const { isReadyForUser } = campaign.strategyStatement;
    updateCampaignStrategyStatement('isReadyForUser', !isReadyForUser);
  };

  render() {
    const { classes, profile, campaign, updateCampaignStrategyStatement } = this.props;
    return (
      <Grid container spacing={24}>
        {/* Title */}
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography color="inherit" variant="h3">
            Strategy Statement
          </Typography>
          <Typography color="inherit" variant="subtitle1" gutterBottom>
            We've curated a complete description of your campaign from the information you gave us
            on our call. Please review the information, make any changes you feel are necessary and
            enter the information at the buttom. Once you think it is complete hit submit and you
            will be ready to work on your ads!
          </Typography>
        </Grid>

        {/* Admin Controls */}
        <SwitchComponent show={profile.isAdmin}>
          <Grid item xs={12}>
            <Paper className={classes.adminControlsSection}>
              <Typography variant="h5">Admin Controls</Typography>
              <Typography variant="subtitle1">Is Ready For User:</Typography>

              <Switch
                checked={campaign.strategyStatement.isReadyForUser}
                onChange={this.toggleIsReadyForUser}
                value="checkedA"
              />
            </Paper>
          </Grid>
        </SwitchComponent>

        {/* Sections */}
        <Grid item xs={12} md={6}>
          <Section
            title="Business Info"
            subtitle="What do you want to express about your business in this campaign?"
            fieldsMetaData={StrategyStatementBusinessFields}
            strategyStatement={campaign.strategyStatement}
            updateStrategyStatement={updateCampaignStrategyStatement}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Section
            title="Positioning"
            subtitle="[Todo helper text here]?"
            fieldsMetaData={StrategyStatementPositioningFields}
            strategyStatement={campaign.strategyStatement}
            updateStrategyStatement={updateCampaignStrategyStatement}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Section
            title="Targeting Strategy"
            subtitle="[Todo helper text here]?"
            fieldsMetaData={StrategyStatementTargetingFields}
            strategyStatement={campaign.strategyStatement}
            updateStrategyStatement={updateCampaignStrategyStatement}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Section
            title="Extra Info"
            subtitle="[Todo helper text here]?"
            fieldsMetaData={StrategyExtraInfoFields}
            strategyStatement={campaign.strategyStatement}
            updateStrategyStatement={updateCampaignStrategyStatement}
          />
        </Grid>
      </Grid>
    );
  }
}

CampaignStrategyStatement.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withHandlers({
    updateCampaignStrategyStatement: FirestoreFunctions.UpdateCampaignStrategyStatement
  }),
  withStyles(styles)
)(CampaignStrategyStatement);
