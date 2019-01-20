import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions
} from '@material-ui/core';
import { connect } from 'react-redux';
import Router from 'next/router';
import { compose, withHandlers } from 'recompose';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { withFirestore, firestoreConnect, isLoaded } from 'react-redux-firebase';
import withNavBar from '../src/withNavBar';
import MyCampaigns from '../components/myCampaigns';
import { validate } from '../src/utils';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 30
  },
  button: {
    marginBottom: 30
  }
};

class Dashboard extends React.Component {
  state = {
    newCampaignDialogOpen: false
  };

  /**
   * Open the NewCampaignDialog
   */
  handleNewCampaignDialogOpen = () => {
    this.setState({ newCampaignDialogOpen: true });
  };

  /**
   * Close the NewCampaignDialog
   */
  handleNewCampaignDialogClose = () => {
    this.setState({ newCampaignDialogOpen: false });
  };

  /**
   * Handle change from text input
   */
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };

  createNewCampaign = () => {
    const { onNewCampaignSubmit, auth } = this.props;
    const { newCampaignName } = this.state;

    // // get all data needed to create new campaign
    const owner = auth.uid;
    const name = newCampaignName;
    if (!validate('dashboard.createNewCampaign', { owner, name })) {
      console.error('COULD NOT CREATE NEW CAMPAIGN');
      // TODO - CREATE VISUAL ERROR IN UI
      return;
    }

    // Close the dialog menu
    this.handleNewCampaignDialogClose();

    // Create the new campaign, and callback goes to the page for that campaign
    onNewCampaignSubmit({ name, owner, createdAt: new Date() }, doc => {
      Router.push(`/campaign?id=${doc.id}`, `campaign/${doc.id}`);
    });
  };

  render() {
    const { classes, campaigns } = this.props;
    const { newCampaignDialogOpen } = this.state;
    return (
      <div>
        <Grid
          container
          direction="row"
          alignItems="center"
          justify="center"
          className={classes.root}
          spacing={16}
        >
          <Grid item xs={10}>
            <MyCampaigns
              campaigns={campaigns}
              handleNewCampaignDialogOpen={this.handleNewCampaignDialogOpen}
            />
          </Grid>
        </Grid>

        <Dialog
          open={newCampaignDialogOpen}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Name Your Campaign</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You're a founder! This means you have early access to our service and can create
              campaigns.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              onChange={this.handleChange('newCampaignName')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleNewCampaignDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.createNewCampaign} color="primary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavBar,
  withFirestore,
  connect(({ firestore: { ordered }, firebase: { auth } }) => ({
    campaigns: ordered.campaigns,
    auth
  })),
  firestoreConnect(({ auth }) => [
    { collection: 'campaigns', where: ['owner', '==', auth.uid || ''] }
  ]),
  withHandlers({
    onNewCampaignSubmit: props => (newTodo, callback) =>
      props.firestore.add('campaigns', { ...newTodo, status: 'incomplete' }).then(doc => {
        if (callback) {
          callback(doc);
        }
      })
  }),
  withStyles(styles)
)(Dashboard);
