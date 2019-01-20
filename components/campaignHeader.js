import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = styles => ({
  root: {
    display: 'flex'
  },
  header: {
    paddingTop: 25,
    paddingBottom: 50
  }
});

const CampaignHeader = ({ classes, campaign }) => (
  <div>
    <Typography className={classes.header} color="inherit" variant="h3">
      {campaign.name}
    </Typography>
  </div>
);

CampaignHeader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignHeader);
