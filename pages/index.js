// index.js Page
import React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import Router from 'next/router';
import withNavBar from '../src/withNavBar';
import SpecialButton from '../components/specialButton';

// import dashboardImg from '/static/dashboard.png';

const styles = ({ palette, spacing }) => ({
  root: {
    flexGrow: 1
  },
  fillViewHeight: {
    height: '100vh'
  },
  section: {
    width: '100%',
    textAlign: 'center'
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
  mainTitleText: {
    paddingTop: 75,
    paddingBottom: 75
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
  coverImage: {
    backgroundImage: `url(/static/cover.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover'
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
      direction="row"
      alignItems="center"
      justify="center"
      className={classNames(classes.section, classes.fillViewHeight, classes.coverImage)}
      spacing={0}
    >
      <Grid item xs={12} className={classNames(classes.coverTitle)}>
        <Typography component="h2" variant="h1" className={classes.textPrimaryLight}>
          <b style={{}}>Social </b> <br />
          <b>Advertising </b> <br />
          <b>Simplified </b>
        </Typography>
      </Grid>
      {/* <Grid container alignItems="center" justify="center" direction="row">
        <SpecialButton onClick={goToSignup} className={classes.callToAction}>
          Get Started Now
        </SpecialButton>
        <SpecialButton
          onClick={goToConsultation}
          className={classNames(classes.callToAction, classes.leftGutter)}
        >
          Free Consultation
        </SpecialButton>
      </Grid> */}
    </Grid>
  </div>
);

export default compose(
  withNavBar,
  withStyles(styles)
)(Index);
