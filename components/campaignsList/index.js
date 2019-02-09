import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import { isLoaded } from 'react-redux-firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import CampaignCard from './campaignCard';
import NewCampaignCard from './newCampaignCard';
import { canUserCreateCampaigns } from '../../src/utils';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

const CampaignsList = ({ classes, campaigns, handleNewCampaignDialogOpen, profile }) => {
  if (!isLoaded(campaigns)) {
    return null;
  }

  return (
    <Grid container spacing={16}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Campaigns</Typography>
      </Grid>
      <NewCampaignCard
        onClick={handleNewCampaignDialogOpen}
        disabled={!canUserCreateCampaigns(profile)}
      />
      {campaigns.map(campaign => (
        <CampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </Grid>
  );
};

CampaignsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  connect(({ firebase: { profile } }) => ({
    profile
  }))
)(CampaignsList);
