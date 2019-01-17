import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { isLoaded } from 'react-redux-firebase';
import { CircularProgress } from '@material-ui/core';
import Router from 'next/router';
import EnhancedTable from './enhancedTable';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

const onRowClick = (event, campaign) => {
  Router.push(`/campaign?id=${campaign.id}`, `campaign/${campaign.id}`);
};

const CampaignsTable = ({ classes, campaigns }) => {
  console.log(campaigns);
  if (!isLoaded(campaigns)) {
    return <CircularProgress className={classes.progress} />;
  }

  return <EnhancedTable title="Campaigns" data={campaigns} onRowClick={onRowClick} />;
};

CampaignsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignsTable);
