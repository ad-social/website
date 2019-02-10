import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { connect } from 'react-redux';
import Router from 'next/router';
import {
  List,
  ListItem,
  ListItemText,
  Grid,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell
} from '@material-ui/core';
import withNavBar from '../src/withNavBar';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  row: {
    cursor: 'pointer'
  }
});

class AdminDashboard extends React.Component {
  state = {};

  /**
   * Go to the campaign page
   */
  onCampaignRowClick = campaign => {
    Router.push(`/campaign?campaignId=${campaign.id}`, `campaign/${campaign.id}`);
  };

  /**
   * Go through the campaigns and sort them by status
   */
  sortCampaignsByStatus() {
    const sortedCampaigns = {};
    const { campaigns } = this.props;
    Object.keys(campaigns).forEach(id => {
      const campaign = { id, ...campaigns[id] };
      const { submittedForReview, reviewPassed, reviewDenied, waitingForAdsetUpdate } = campaign;
      let status = '';
      if (submittedForReview && !reviewPassed) {
        status = 'Waiting for Review Response';
      } else if (waitingForAdsetUpdate) {
        status = 'Waiting for Adset Update';
      }
      // make sure the array for this status exists
      if (!sortedCampaigns[status]) {
        sortedCampaigns[status] = [];
      }
      // Add this campaign to it's cooresponding status array
      sortedCampaigns[status].push(campaign);
    });
    return sortedCampaigns;
  }

  render() {
    const { classes, campaigns } = this.props;
    if (!isLoaded(campaigns) || isEmpty(campaigns)) {
      return null;
    }

    const sortedCampaigns = this.sortCampaignsByStatus();
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          {Object.keys(sortedCampaigns).map(status => {
            const campaignsWithStatus = sortedCampaigns[status];
            return (
              <Grid item xs={10}>
                <Typography variant="h6" className={classes.title}>
                  {status}
                </Typography>
                <Table className={classes.table}>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Owner</TableCell>
                    </TableRow>
                  </TableHead>
                  {campaignsWithStatus.map(campaign => (
                    <TableRow
                      className={classes.row}
                      hover
                      onClick={event => this.onCampaignRowClick(campaign)}
                      key={campaign.id}
                    >
                      <TableCell scope="row">{campaign.name}</TableCell>
                      <TableCell align="right">{campaign.owner.profile.name}</TableCell>
                    </TableRow>
                  ))}
                </Table>
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

AdminDashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar,
  firestoreConnect(props => [{ collection: 'campaigns' }]),
  connect(({ firestore: { data } }) => ({
    campaigns: data.campaigns
  }))
)(AdminDashboard);
