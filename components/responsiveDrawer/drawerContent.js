import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, IconButton, Grid } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { compose } from 'redux';
import Router from 'next/router';
import { isLoaded } from 'react-redux-firebase';
import Logo from '../logo';

const listItemHeight = 60;

const styles = theme => ({
  root: {
    display: 'flex'
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  listItem: {
    height: listItemHeight
  },
  grow: {
    flexGrow: 1
  },
  toolbar: theme.mixins.toolbar
});

const DrawerContent = props => {
  const { classes, page, campaign, changePage, handleDrawerClose } = props;
  const reviewPassed = campaign && campaign.reviewPassed && campaign.reviewPassed === true;

  return (
    <div>
      <Grid container direction="row" justify="space-between" wrap="nowrap">
        <Grid container justify="center" alignItems="center" className={classes.grow}>
          <Grid item>
            <Logo />
          </Grid>
        </Grid>

        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
      </Grid>

      <List>
        <ListItem
          onClick={() => changePage('strategy')}
          selected={page === 'strategy'}
          button
          key="strategy"
          className={classes.listItem}
        >
          <ListItemIcon>
            <SettingsIcon />
          </ListItemIcon>
          <ListItemText primary="Strategy" />
        </ListItem>

        <ListItem
          onClick={() => changePage('dashboard')}
          selected={page === 'dashboard'}
          button
          key="Dashboard"
          className={classes.listItem}
          disabled={!reviewPassed}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <ListItem
          onClick={() => changePage('analytics')}
          selected={page === 'analytics'}
          button
          key="Analytics"
          className={classes.listItem}
          disabled={!reviewPassed}
        >
          <ListItemIcon>
            <BarChartIcon />
          </ListItemIcon>
          <ListItemText primary="Analytics" />
        </ListItem>
      </List>
    </div>
  );
};

DrawerContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter
)(DrawerContent);
