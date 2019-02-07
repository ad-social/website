import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper } from '@material-ui/core';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import AdminAdsetControls from './adminAdsetControls';
import SwitchComponent from '../switchComponent';
import { adImagesPathV1 } from '../../src/utils';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  }
});

class AdSet extends React.Component {
  state = {
    adImageURL: ''
  };

  render() {
    const { adImageURL } = this.state;
    const { classes, firebase, profile, adset, id, updateAdset } = this.props;
    const { status, copy, moreInfo } = adset;

    if (status === 'ready') {
      const adImagesStorageRef = firebase.storage().ref();
      adImagesStorageRef
        .child(`${adImagesPathV1}/ad-${id}`)
        .getDownloadURL()
        .then(url => {
          this.setState({ adImageURL: url });
        });
    }

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            This is where we will work together in getting your perfect ad ready. You can also
            control the adset from here.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {status !== 'ready' ? (
              <Typography variant="subtitle1">
                You're adset isn't ready yet! We're working on it right now and it will be ready
                within 3 business days.
              </Typography>
            ) : (
              <div>
                <img src={adImageURL} />
                <Typography variant="h6">
                  <b>
                    <u>Copy</u>
                  </b>
                </Typography>
                <Typography variant="subtitle2">{copy}</Typography>
                <Typography variant="h6">
                  <b>
                    <u>More Info</u>
                  </b>
                </Typography>
                <Typography variant="subtitle2">{moreInfo}</Typography>
              </div>
            )}
            <SwitchComponent show={profile.isAdmin === true}>
              <AdminAdsetControls {...this.props} />
            </SwitchComponent>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

AdSet.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  withStyles(styles)
)(AdSet);
