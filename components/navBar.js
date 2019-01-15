// navBar.js - Component
import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';
import Router from 'next/router';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import IconButton from '@material-ui/core/IconButton';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

const styles = {
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    cursor: 'pointer',
    width: 100
  }
};

class NavBar extends React.Component {
  state = {
    anchorEl: null
  };

  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = callback => () => {
    this.setState({ anchorEl: null });
    if (callback) {
      callback();
    }
  };

  /**
   * Render the menu buttons when the user is signed in
   */
  renderMenuButtons() {
    const { auth, firebase } = this.props;

    // Don't show anything if auth hasn't loaded yet
    if (!isLoaded(auth)) {
      return null;
    }

    return (
      <div>
        <Link href="/dashboard">
          <Button color="inherit">My Dashboard</Button>
        </Link>
      </div>
    );
  }

  /**
   * Renders auth buttons depending on user's auth state.
   * When the user isn't signed in show login and sign up buttons.
   * When the user is logged in, show a logout button
   * TODO - add auth state checking logic instead of defaulting to signed out buttons
   */
  renderAuthButtons = () => {
    const { auth, firebase } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    // Don't show anything if auth hasn't loaded yet
    if (!isLoaded(auth)) {
      return null;
    }

    // Show login/sign up buttons if auth is loaded but empty
    if (isEmpty(auth)) {
      return (
        <div>
          <Link href="/auth?action=login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link href="/auth?action=signup">
            <Button color="inherit">Sign Up</Button>
          </Link>
        </div>
      );
    }

    // Show profile icon if user is authenticated
    return (
      <div>
        <IconButton
          aria-owns={open ? 'menu-appbar' : undefined}
          aria-haspopup="true"
          onClick={this.handleMenu}
          color="inherit"
        >
          <AccountCircle />
        </IconButton>

        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right'
          }}
          open={open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose()}>Profile</MenuItem>
          <MenuItem onClick={this.handleClose(firebase.logout)}>Logout</MenuItem>
        </Menu>
      </div>
    );
  };

  render() {
    // Styles are passed as props.classes when we export using 'withStyles'
    const { classes, firebase, auth } = this.props;

    return (
      <AppBar position="fixed">
        <Toolbar>
          {/* Display a logo text element that takes us to the root page on click */}
          <Typography
            onClick={() => Router.push('/')}
            variant="h6"
            color="inherit"
            className={classes.grow}
          >
            <div className={classes.logo}>adsocial</div>
          </Typography>

          {this.renderMenuButtons()}
          {this.renderAuthButtons()}
        </Toolbar>
      </AppBar>
    );
  }
}

NavBar.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired
  }),
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles)
)(NavBar);
