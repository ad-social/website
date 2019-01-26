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
import CollectionsIcon from '@material-ui/icons/Collections';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import { Collapse } from '@material-ui/core';
import { compose } from 'redux';
import Router from 'next/router';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  toolbar: theme.mixins.toolbar
});

class DrawerContent extends React.Component {
  state = {
    open: false
  };

  handleClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  render() {
    const { classes, page, changePage } = this.props;

    return (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          <ListItem
            onClick={() => changePage('setup')}
            selected={page === 'setup'}
            button
            key="Setup"
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
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" secondary="Overview of your campaign" />
          </ListItem>

          <ListItem
            onClick={() => changePage('analytics')}
            selected={page === 'analytics'}
            button
            key="Analytics"
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" secondary="See how all of your Ad Sets are doing" />
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
