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
import CampaignsTable from '../components/campaignsTable';
import { validate } from '../src/utils';

const styles = {
  root: {
    flexGrow: 1,
    paddingTop: 30
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

    this.handleNewCampaignDialogClose();
    onNewCampaignSubmit({ name, owner, createdAt: new Date() });
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.handleNewCampaignDialogOpen}
            >
              Start A New Campaign
            </Button>
          </Grid>
          <Grid item xs={8}>
            <CampaignsTable campaigns={campaigns} />
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
  withHandlers({
    onNewCampaignSubmit: props => newTodo => props.firestore.add('campaigns', { ...newTodo })
  }),
  firestoreConnect(({ auth }) => [
    { collection: 'campaigns', owner: auth.uid } // or `todos/${props.todoId}`
  ]),
  withStyles(styles)
)(Dashboard);
