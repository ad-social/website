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
  landingTextMobile: {
    fontSize: '3em'
  },

  titleText: {
    color: palette.custom.adsocialPlue,
    letterSpacing: 5,
    backgroundColor: 'rgba(255,255,255,0.96)',
    padding: 10
  },

  landingPageImg: {
    width: '100%',
    maxWidth: 600
  },

  howItWorksContainer: {
    paddingTop: 50
  },
  howItWorksCol: {
    textAlign: 'center',
    padding: 50,
    paddingBottom: 100
  },
  howItWorksIconContainer: {
    textAlign: 'center'
  },
  staticIcon: {
    width: '50%',
    maxWidth: 250
  },

  callToAction: {
    fontSize: '1.5em',
    float: 'left'
  },
  leftGutter: {
    marginLeft: spacing.unit * 5
  }
});

const howItWorksColumns = [
  {
    image: '/static/TargetIcon.png',
    title: 'We build your custom targeting strategy'
  },
  {
    image: '/static/LandscapeIcon.png',
    title: 'We create and deliver your adset with an image and copy'
  },
  {
    image: '/static/RocketIcon.png',
    title: 'We launch the campaign for you'
  },
  {
    image: '/static/BarChartIcon.png',
    title: 'We provide an intuitive analytics dashboard'
  }
];

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

    <Hidden xsDown>
      <Grid container justify="center" alignItems="center" className={classes.howItWorksContainer}>
        {howItWorksColumns.map(column => (
          <Grid item xs={3} className={classes.howItWorksIconContainer}>
            <img className={classes.staticIcon} src={column.image} />
          </Grid>
        ))}
      </Grid>
      <Grid container justify="center" className={classes.howItWorksContainer}>
        {howItWorksColumns.map(column => (
          <Grid item xs={3} className={classes.howItWorksIconContainer}>
            <Typography variant="h5">{column.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </Hidden>
    <Hidden smUp>
      <Grid container justify="center" alignItems="center" className={classes.howItWorksContainer}>
        {howItWorksColumns.map(column => (
          <Grid item xs={12} className={classes.howItWorksCol}>
            <img className={classes.staticIcon} src={column.image} />
            <Typography variant="h4">{column.title}</Typography>
          </Grid>
        ))}
      </Grid>
    </Hidden>
  </div>
);

export default compose(
  withNavBar({ useBuffer: false }),
  withStyles(styles)
)(Index);
