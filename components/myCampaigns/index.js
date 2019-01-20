import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import { isLoaded } from 'react-redux-firebase';
import CampaignCard from './campaignCard';
import NewCampaignCard from './newCampaignCard';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

const MyCampaigns = ({ classes, campaigns, handleNewCampaignDialogOpen }) => {
  if (!isLoaded(campaigns)) {
    return null;
  }

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Campaigns</Typography>
      </Grid>
      <NewCampaignCard onClick={handleNewCampaignDialogOpen} />
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </Grid>
  );
};

MyCampaigns.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyCampaigns);
