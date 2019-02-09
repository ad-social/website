import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Paper, Button } from '@material-ui/core';
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
  state = {};

  render() {
    const { classes, firebase, profile, adset, id, updateAdset, acceptAdset } = this.props;
    const { status, copy, moreInfo, ready, adImageURL } = adset;

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
            {status === 'incomplete' ? (
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

            <SwitchComponent show={profile.isAdmin === true && status !== 'ready'}>
              <AdminAdsetControls {...this.props} />
            </SwitchComponent>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <SwitchComponent show={status === 'waitingForUser'}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => acceptAdset(id)}
            >
              Accept
            </Button>
            <Button color="primary" variant="contained" className={classes.button}>
              Deny
            </Button>
          </SwitchComponent>
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
