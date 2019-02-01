// index.js Page
import React from 'react';
import { withStyles, createStyles } from '@material-ui/core';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { compose } from 'redux';
import withNavBar from '../src/withNavBar';

// import dashboardImg from '/static/dashboard.png';

const styles = ({ palette }) => ({
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

  blue: {
    backgroundColor: '#45aaf2'
  },
  orange: {
    backgroundColor: '#fa8231'
  },
  notAllowed: {
    fontSize: 10
  }
});

const Index = ({ classes }) => (
  <div>
    <Grid
      container
      direction="column"
      alignItems="center"
      justify="center"
      className={classNames(classes.section, classes.fillViewHeight, classes.secondaryMain)}
      spacing={0}
    >
      <Grid item xs={6} className={classes.textLeft}>
        <Typography component="h2" variant="h1" color="primary">
          <b>Social</b> <br />
          <b>Advertising</b> <br />
          <b>Simplified</b>
        </Typography>
      </Grid>
    </Grid>

    <Grid
      container
      direction="column"
      alignItems="center"
      // justify="center"
      className={`${classes.section}`}
      spacing={0}
    >
      <Grid item xs={10} className={classes.mainTitleText}>
        <Typography component="h2" variant="h2">
          <b>HERE'S HOW IT WORKS</b>
        </Typography>
      </Grid>

      <Grid item xs={8} className={`${classes.textLeft}`}>
        <Typography variant="body1">
          <p>
            <b>
              Our goal is to become your online destination for quick, easy and hyper-targeted
              social media advertising campaigns.
            </b>
          </p>
          <p>
            We are able to distribute ads across Instagram, Twitter, Facebook, Snapchat, and
            LinkedIn
          </p>
          <p>
            <b>
              Ad Social is a micro agency that offers one service: social media advertising
              campaigns
            </b>
          </p>
          <p>
            That being said, we like to keep it simple and easy here at Ad Social. The following
            flow chart explains how our one and only service works.
          </p>
        </Typography>
      </Grid>
    </Grid>
  </div>
);

export default compose(
  withNavBar,
  withStyles(styles)
)(Index);
