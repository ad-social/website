import React from 'react';
import Button from '@material-ui/core/Button';
import Router from 'next/router';
import Divider from '@material-ui/core/Divider';
import { Typography, withStyles } from '@material-ui/core';

const styles = {
  button: {
    borderRight: '0.05em solid white',
    float: 'left'
  },
  buttonStart: {
    borderLeft: '0.05em solid white'
  }
};

const ButtonsMenu = ({ classes }) => (
  <div style={{ display: 'inline-block' }}>
    <div className={`${classes.button} ${classes.buttonStart}`}>
      <Button
        onClick={() => {
          Router.push('/');
        }}
        color="inherit"
      >
        Home
      </Button>
    </div>

    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push('/whatWeDo');
        }}
        color="inherit"
      >
        What We Do
      </Button>
    </div>

    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push('/work');
        }}
        color="inherit"
      >
        Work
      </Button>
    </div>

    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push('/information');
        }}
        color="inherit"
      >
        Information
      </Button>
    </div>

    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push('/contact');
        }}
        color="inherit"
      >
        Contact Us
      </Button>
    </div>

    <div className={classes.button}>
      <Button
        onClick={() => {
          Router.push('/myCampaigns');
        }}
        color="inherit"
      >
        My Campaigns
      </Button>
    </div>
  </div>
);

export default withStyles(styles)(ButtonsMenu);
