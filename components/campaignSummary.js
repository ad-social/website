import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Paper, Typography } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});
const CampaignSummary = ({ classes, campaign }) => (
  <div className={classes.root}>
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="title">Objective</Typography>
        <Typography variant="subtitle1">{campaign.objective}</Typography>

        <Typography variant="title">Platforms</Typography>
        <Typography variant="subtitle1">
          {campaign.facebook ? 'Facebook' : ''}
          {campaign.instagram ? ', Instagram' : ''}
        </Typography>

        <Typography variant="title">Target</Typography>
        <Typography variant="subtitle1">{`Gender: ${campaign.gender}`}</Typography>
        <Typography variant="subtitle1">
          {`Age: ${campaign.ageMin} - ${campaign.ageMax}`}
        </Typography>
        <Typography variant="subtitle1">
          {`Description: ${campaign.targetingDescription}`}
        </Typography>
      </Grid>
    </Grid>
  </div>
);

CampaignSummary.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignSummary);
