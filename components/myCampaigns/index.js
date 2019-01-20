import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Divider } from '@material-ui/core';
import { isLoaded } from 'react-redux-firebase';
import CampaignCard from './campaignCard';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

const MyCampaigns = ({ classes, campaigns }) => {
  if (!isLoaded(campaigns)) {
    return null;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="subtitle1">Campaigns</Typography>
        {campaigns.map(campaign => (
          <CampaignCard campaign={campaign} />
        ))}
      </Grid>
    </Grid>
  );
};

MyCampaigns.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MyCampaigns);
