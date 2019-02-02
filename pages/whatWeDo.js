import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { Grid, Typography } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import Collections from '@material-ui/icons/Collections';
import BarChart from '@material-ui/icons/BarChart';
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
    fontSize: '1.5em',
    marginBottom: '-0.18em'
  }
});

class WhatWeDo extends React.Component {
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
            <b>What does ad social do?</b>
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Typography variant="body1">
            <b>Ad Social</b> is an online advertising agency that creates hyper-targeted micro
            advertising campaigns on social media for small businesses. We only make money when our
            ads and strategies perform, so you dont have to worry about paying for a service that
            does not produce results!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography className={classes.centerText} variant="body1">
            <b>Here's a basic rundown of our process...</b>
          </Typography>
        </Grid>

        <Grid item xs={10}>
          <Typography gutterBottom variant="h4">
            <Create className={classes.icon} /> <b>Create a campaign</b>
          </Typography>
          <Typography variant="body1" gutterBottom>
            <b>Set objective(s)</b>
            <br />
            - Tell us if you want to drive traffic to your website, drive foot traffic to your
            physical location, build brand awareness, etc.
            <br />
            - Decide whether you want to target repeat customers, new customers, or both. ​
            <br />
            <br />
            <b>Tell us about your target market</b>
            <br />
            - We are going to want to gather information about your target market so we can put
            together an in-depth targeting strategy for your campaign ​
            <br />
            <br />
            <b>Choose platform(s)</b>
            <br />- Select the social media platform(s) you want to deploy the ads on
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <SpecialButton
            onClick={() => {
              this.pushPage('/dashboard');
            }}
          >
            Start a campaign
          </SpecialButton>
        </Grid>

        <Grid item xs={10}>
          <Typography gutterBottom variant="h4">
            <Collections className={classes.icon} />
            <b>Select the ad (image + copy)</b>
          </Typography>
          <Typography variant="body1">
            We will craft and send you 3 variations of images and copy for you to pick from
            <b>
              <i>within 48 hours of inception</i>
            </b>
            <br />
            <br />
            Here is an example of an ad + copy ​
            <br />
            <br />
            (IMAGE HERE)
            <br />
            <br />
            Each ad will be optimized for its platform (Facebook/Instagram, stories/feed) before
            launch
            <br />
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <SpecialButton
            onClick={() => {
              this.pushPage('/work');
            }}
          >
            See more of our work
          </SpecialButton>
        </Grid>

        <Grid item xs={10}>
          <Typography gutterBottom variant="h4">
            <BarChart className={classes.icon} />
            <b>Relax & Track</b>
          </Typography>
          <Typography variant="body1">
            Upon launching your campaign, we will give you full access to an analytics dashboard
            that will track your campign's performance
            <br />
            (IMAGE HERE)
          </Typography>
        </Grid>
        <Grid item xs={10}>
          <SpecialButton
            onClick={() => {
              this.pushPage('/dashboard');
            }}
          >
            Schedule a FREE consultation
          </SpecialButton>
        </Grid>
      </Grid>
    );
  }
}

WhatWeDo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavbar
)(WhatWeDo);
