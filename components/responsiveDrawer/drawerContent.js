import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import SettingsIcon from '@material-ui/icons/Settings';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Collapse, IconButton } from '@material-ui/core';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { compose } from 'redux';
import Router from 'next/router';

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
  toolbar: theme.mixins.toolbar
});

class DrawerContent extends React.Component {
  render() {
    const { classes, page, changePage, handleDrawerClose } = this.props;

    return (
      <div>
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <List>
          <ListItem
            onClick={() => changePage('setup')}
            selected={page === 'setup'}
            button
            key="Setup"
            className={classes.listItem}
          >
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary="Setup" />
          </ListItem>

          <ListItem
            onClick={() => changePage('dashboard')}
            selected={page === 'dashboard'}
            button
            key="Dashboard"
            className={classes.listItem}
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
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>

          {/* <ListItem button onClick={this.handleClick}>
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText inset primary="Ad Sets" secondary="View and request new Ad Sets" />
            {this.state.open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={this.state.open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem button className={classes.nested}>
                <ListItemText inset primary="Set 1" />
              </ListItem>
            </List>
          </Collapse> */}
        </List>
        {/* <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List> */}
      </div>
    );
  }
}

DrawerContent.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withRouter
)(DrawerContent);
