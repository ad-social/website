import React from 'react';
import PropTypes from 'prop-types';
import {
  withStyles,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Typography
} from '@material-ui/core';
import { connect } from 'react-redux';
import Router from 'next/router';
import { compose, withHandlers } from 'recompose';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Error from '@material-ui/icons/ErrorOutline';
import { withFirestore, firestoreConnect } from 'react-redux-firebase';
import CampaignsList from '../components/campaignsList';
import { validate, canUserCreateCampaigns } from '../src/utils';
import SwitchComponent from '../components/switchComponent';
import withNavBar from '../src/withNavBar';

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 30
  },
  button: {
    marginBottom: 30
  },
  error: {
    color: theme.palette.error.main
  },
  icon: {
    marginBottom: '-0.18em'
  }
});

class MyCampaigns extends React.Component {
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
    const { onNewCampaignSubmit, auth, profile } = this.props;
    const { newCampaignName } = this.state;

    // // get all data needed to create new campaign
    const ownerId = auth.uid;
    const name = newCampaignName;
    if (!validate('dashboard.createNewCampaign', { ownerId, profile, name })) {
      console.error('COULD NOT CREATE NEW CAMPAIGN');
      // TODO - CREATE VISUAL ERROR IN UI
      return;
    }

    // Close the dialog menu
    this.handleNewCampaignDialogClose();

    // Create the new campaign, and callback goes to the page for that campaign
    onNewCampaignSubmit(
      {
        owner: { id: ownerId, profile: { name: profile.name, email: profile.email } },
        business: profile.activeBusiness,
        name,
        createdAt: new Date()
      },
      doc => {
        Router.push(`/campaign?campaignId=${doc.id}`, `campaign/${doc.id}`);
      }
    );
  };

  render() {
    const { classes, campaigns, profile } = this.props;
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
          <SwitchComponent show={!canUserCreateCampaigns(profile)}>
            <Grid item xs={10}>
              <Typography variant="subtitle1" className={classes.error}>
                <Error className={classes.icon} />
                Only users in our Founders Club can create campaigns right now
              </Typography>
            </Grid>
          </SwitchComponent>

          <Grid item xs={10}>
            <CampaignsList
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
            <Button onClick={this.handleNewCampaignDialogClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.createNewCampaign} color="secondary">
              Continue
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

MyCampaigns.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirestore,
  connect(({ firestore: { ordered }, firebase: { auth, profile } }) => ({
    campaigns: ordered.campaigns,
    auth,
    profile
  })),
  firestoreConnect(({ auth }) => [
    { collection: 'campaigns', where: ['owner.id', '==', auth.uid || ''] }
  ]),
  withHandlers({
    onNewCampaignSubmit: props => (newCampaign, callback) =>
      props.firestore.add('campaigns', { ...newCampaign, status: 'incomplete' }).then(doc => {
        if (callback) {
          callback(doc);
        }
      })
  }),
  withNavBar,
  withStyles(styles)
)(MyCampaigns);
