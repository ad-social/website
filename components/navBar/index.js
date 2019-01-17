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

import ButtonsMenu from './buttonsMenu';
import AuthMenu from './authMenu';

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

  /**
   * Render the menu buttons when the user is signed in
   */
  renderOnlyWhenAuthenticated(component) {
    const { auth, firebase } = this.props;
    // Don't show anything if auth hasn't loaded yet
    if (!isLoaded(auth) || isEmpty(auth)) {
      return null;
    }

    return component;
  }

  // renderMenuButtons() {
  //   const { auth, firebase } = this.props;

  //   // Don't show anything if auth hasn't loaded yet
  //   if (!isLoaded(auth) || isEmpty(auth)) {
  //     return null;
  //   }

  //   return (
  //     <div>
  //       <Link href="/dashboard">
  //         <Button color="inherit">My Dashboard</Button>
  //       </Link>
  //     </div>
  //   );
  // }

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
          {this.renderOnlyWhenAuthenticated(<ButtonsMenu />)}
          {<AuthMenu />}
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
