import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { firestoreConnect, isLoaded, isEmpty, withFirebase } from 'react-redux-firebase';
import Firebase from 'firebase';
import FacebookLogin from 'react-facebook-login';
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
  TableCell,
  Button
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

class Account extends React.Component {
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
  signinWithFacebook = () => {
    const { firebase } = this.props;
    console.log('SignInWithfacebook()');
    // firebase
    //   .auth()
    //   .currentUser.linkWithPopup(provider)
    //   .then(result => {
    //     // Accounts successfully linked.
    //     const credential = result.credential;
    //     const user = result.user;
    //     firebase.updateProfile({
    //       facebookCredentials: {
    //         accessToken: credential.accessToken,
    //         email: credential.emails || result.email || ''
    //       }
    //     });
    //     console.log('CREDENTIAL: ', credential);
    //     console.log('USER: ', user);
    //     // ...
    //   })
    //   .catch(error => {
    //     // Handle Errors here.
    //     // ...
    //     console.log('ERROR: ', error);
    //   });

    // const provider = new firebase.auth.FacebookAuthProvider();
    console.log(provider);
  };

  responseFacebook = response => {
    const { firebase, profile } = this.props;
    // update profile
    firebase.updateProfile({
      facebookCredentials: {
        accessToken: response.accessToken
      }
    });
    console.log('Creds response: ', response);
  };

  render() {
    const { classes, profile } = this.props;

    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={16}>
          <Grid item xs={10} sm={10}>
            <Typography variant="h4">Account</Typography>
            <Typography variant="subtitle1">
              Email:
              {profile.email}
            </Typography>
            <br />
            <Typography variant="subtitle1">
              Facebook:
              {profile.email}
            </Typography>
            {/* <Button onClick={this.signinWithFacebook}>Link Facebook Account</Button> */}
            <FacebookLogin
              appId="604130970011271"
              autoLoad
              scope="ads_read"
              callback={this.responseFacebook}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar,
  withFirebase,
  connect(({ firebase: { profile } }) => ({
    profile
  }))
)(Account);
