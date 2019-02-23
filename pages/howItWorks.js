import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { Grid, Typography } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import Weekend from '@material-ui/icons/Weekend';
import BarChart from '@material-ui/icons/BarChart';
import PhoneInTalk from '@material-ui/icons/PhoneInTalk';
import MoneyOff from '@material-ui/icons/MoneyOff';
import AccessTime from '@material-ui/icons/AccessTime';
import Web from '@material-ui/icons/Web';
import Replay from '@material-ui/icons/Replay';
import Wallpaper from '@material-ui/icons/Wallpaper';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import FlightTakeoff from '@material-ui/icons/FlightTakeoff';
// flight takeoff for launch
import classNames from 'classnames';
import Router from 'next/router';
import withNavbar from '../src/withNavBar';
import SpecialButton from '../components/specialButton';

const styles = theme => ({
  root: {
    display: 'flex',
    marginTop: '3em'
  },
  centerText: {
    textAlign: 'center'
  },
  icon: {
    marginBottom: '-0.23em'
  },
  iconLarge: {
    fontSize: '4em'
  }
});

class HowItWorks extends React.Component {
  state = {};

  pushPage(page) {
    Router.push(page, page);
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container justify="center" spacing={40} className={classes.root}>
        <Grid item className={classes.centerText} gutterTop>
          <Typography variant="h3">
            <b>How does Ad Social work?</b>
          </Typography>
        </Grid>

        <Grid item xs={10} lg={8} className={classes.centerText}>
          <Typography variant="body1">
            <b>
              We create social media advertising campaigns for you. Ready in 3 business days. FREE
              until it works.
            </b>
          </Typography>
        </Grid>

        <Grid item xs={10} lg={7}>
          <Typography className={classes.centerText} variant="body1" gutterBottom>
            <Grid container justify="center">
              <Grid item xs={3} sm={2}>
                <PhoneInTalk className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <MoneyOff className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Create className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
            </Grid>
            <br />
            First, schedule a FREE, no obligation consultation call with us to chat about your
            business and set up your campaign strategy LIVE on your computer! It’s pretty much magic
            - we’ll explain later.
          </Typography>
        </Grid>

        <Grid item xs={10} lg={7}>
          <Typography className={classes.centerText} variant="body1" gutterBottom>
            <Grid container justify="center">
              <Grid item xs={3} sm={2}>
                <AccessTime className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Web className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Replay className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
            </Grid>
            <br />
            As soon as the campaign is submitted, we take 3 business days to create both your…
            <br />
            <b> <SupervisedUserCircle className={classes.icon} /> Targeting strategy</b>
            <br />
            <b>&</b>
            <br />
            <b> <Wallpaper className={classes.icon} /> Ad set</b>
            <Typography variant="body1" gutterBottom>
            When the ad set is ready, we will deliver it to your dashboard on our website. Here, you can request to make revisions and write comments about the ad set to give us feedback.
            </Typography>
          </Typography>
        </Grid>

        <Grid item xs={10} lg={7}>
          <Typography className={classes.centerText} variant="body1" gutterBottom>
            <Grid container justify="center">
              <Grid item xs={3} sm={2}>
                <FlightTakeoff className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <BarChart className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
              <Grid item xs={3} sm={2}>
                <Weekend className={classNames(classes.icon, classes.iconLarge)} />
              </Grid>
            </Grid>
            <br />
            Once both of us see eye to eye on your entire campaign, we launch the ad for you! At this point, you can relax! All you do now is track the campaign’s performance whenever and wherever you want!
            <br />
            <br />
            Sound like something you could benefit from?
            <br />
            <br />
            Learn more by scheduling a FREE, no obligation consultation with our founders!
          </Typography>
        </Grid>


        <Grid item xs={10} className={classes.centerText}>
          <SpecialButton
            onClick={() => {
              this.pushPage('/dashboard');
            }}
          >
            Start a campaign
          </SpecialButton>
        </Grid>
      </Grid>
    );
  }
}

HowItWorks.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavbar
)(HowItWorks);
