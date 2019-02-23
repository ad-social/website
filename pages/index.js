// index.js Page
import React from 'react';
import { withStyles, createStyles, Paper, Hidden } from '@material-ui/core';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import Router from 'next/router';
import withNavBar from '../src/withNavBar';
import SpecialButton from '../components/specialButton';

// import dashboardImg from '/static/dashboard.png';

const styles = ({ palette, spacing, breakpoints }) => ({
  root: {
    flexGrow: 1
  },
  fillViewHeight: {
    height: '100vh'
  },

  landing: {
    paddingTop: 25,
    width: '100%',
    textAlign: 'center',
    backgroundImage: "url('/static/landingPageBG.png')",
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundColor: 'red'
  },

  textPrimaryLight: {
    color: 'white'
  },
  secondaryMain: {
    backgroundColor: palette.secondary.main
  },
  textLeft: {
    textAlign: 'left',
    marginLeft: 30,
    marginRight: 30
  },
  textCenter: {
    textAlign: 'center'
  },
  whiteText: {
    color: 'white'
  },
  titleText: {
    color: palette.custom.adsocialPlue,
    letterSpacing: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
    padding: 10
  },
  mainTitleText: {
    paddingTop: 75,
    paddingBottom: 75
  },

  landingPageImg: {
    width: '100%',
    maxWidth: 600
  },

  howItWorksSection: {
    paddingTop: 50,
    paddingBottom: 50
  },

  coverTitle: {
    marginLeft: 30,
    marginRight: 30,
    paddingBottom: 100
  },
  blue: {
    backgroundColor: '#45aaf2'
  },
  orange: {
    backgroundColor: '#fa8231'
  },
  notAllowed: {
    fontSize: 10
  },

  callToAction: {
    fontSize: '1.5em',
    float: 'left'
  },
  leftGutter: {
    marginLeft: spacing.unit * 5
  }
});

const goToSignup = () => {
  Router.push(`/auth?action=signup`, `/auth?action=signup`);
};

const goToConsultation = () => {
  Router.push('https://calendly.com/samlambert');
};

const Index = ({ classes }) => (
  <div>
    <Grid
      container
      justify="center"
      alignItems="center"
      direction="column"
      className={classNames(classes.landing, classes.fillViewHeight)}
      spacing={0}
    >
      {/* Desktop */}
      <Hidden smDown>
        <Typography
          variant="h1"
          className={classNames(classes.titleText, classes.landingTextDesktop)}
        >
          <b>social advertising</b>
        </Typography>
        <br />
        <Typography
          variant="h1"
          className={classNames(classes.titleText, classes.landingTextDesktop)}
        >
          <b>simplified</b>
        </Typography>
      </Hidden>

      {/* Mobile */}
      <Hidden mdUp>
        <Typography
          variant="h1"
          className={classNames(classes.titleText, classes.landingTextMobile)}
        >
          <b>social</b>
        </Typography>
        <br />
        <Typography
          variant="h1"
          className={classNames(classes.titleText, classes.landingTextMobile)}
        >
          <b>advertising</b>
        </Typography>
        <br />
        <Typography
          variant="h1"
          className={classNames(classes.titleText, classes.landingTextMobile)}
        >
          <b>simplified</b>
        </Typography>
      </Hidden>
    </Grid>
    {/* <Grid container>
      <Grid item xs={12}>
        asdf
      </Grid>
    </Grid> */}
  </div>
);

export default compose(
  withNavBar({ useBuffer: false }),
  withStyles(styles)
)(Index);
