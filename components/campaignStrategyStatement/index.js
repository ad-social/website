import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { compose } from 'redux';
import { withHandlers } from 'recompose';
import Section from './section';

import FirestoreFunctions from '../../src/firestoreFunctions';
import {
  StrategyStatementBusinessFields,
  StrategyStatementPositioningFields
} from '../../src/campaignMetaData';

const styles = theme => ({});

class CampaignStrategyStatement extends React.Component {
  state = {};

  render() {
    const { classes, campaign, updateCampaignStrategyStatement } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={12} className={classes.titleContainer}>
          <Typography color="inherit" variant="h3">
            Strategy Statement
          </Typography>
          <Typography color="inherit" variant="subtitle1" gutterBottom>
            Tell us about your campaign, what you'd like to acheive, how much you'd like to spend,
            etc. We'll review the information and make sure everything is good to go!
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <Section
            title="Business Info"
            subtitle="What do you want to express about your business in this campaign?"
            fields={StrategyStatementBusinessFields}
            strategyStatement={campaign.strategyStatement}
            updateStrategyStatement={updateCampaignStrategyStatement}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Section
            title="Positioning"
            subtitle="[Todo helper text here]?"
            fields={StrategyStatementPositioningFields}
            strategyStatement={campaign.strategyStatement}
            updateStrategyStatement={updateCampaignStrategyStatement}
          />
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Section
            title="Positioning"
            subtitle="[put text here]?"
            sectionDataPath="strategy.positioning"
            sectionData={campaign.strategy.positioning}
            style={{ width: '100%' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Section
            title="Targeting"
            subtitle="[todo add text here]?"
            sectionDataPath="strategy.targeting"
            sectionData={campaign.strategy.targeting}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <Section
            title="Extra Info"
            subtitle="[todo add text here]?"
            sectionDataPath="strategy.extra"
            sectionData={campaign.strategy.extra}
          />
        </Grid> */}
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
