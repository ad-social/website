// navBar.js - Component
import React from 'react';
import PropTypes from 'prop-types';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { IconButton, Menu, MenuItem, Link, Button } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withFirebase, isLoaded, isEmpty } from 'react-redux-firebase';

import Logo from '../logo';
import ButtonsMenu from './buttonsMenu';
import AuthMenu from './authMenu';

const styles = ({ palette }) => ({
  // appBar: {
  //   backgroundColor: palette.primary.main
  // },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  logo: {
    cursor: 'pointer',
    width: 100,
    fontFamily: 'Comfortaa'
  }
});

class NavBar extends React.Component {
  /**
   * Render the menu buttons when the user is signed in
   */
  renderOnlyWhenAuthenticated(component) {
    const { auth } = this.props;
    // Don't show anything if auth hasn't loaded yet
    if (!isLoaded(auth) || isEmpty(auth)) {
      return null;
    }

    return component;
  }

  render() {
    // Styles are passed as props.classes when we export using 'withStyles'
    const { classes, auth } = this.props;
    const isSignedIn = isLoaded(auth) && !isEmpty(auth);

    return (
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {/* Display a logo text element that takes us to the root page on click */}
          <Logo shouldGrow />
          <ButtonsMenu isSignedIn={isSignedIn} />
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
  })
};

export default compose(
  withFirebase,
  connect(({ firebase: { auth } }) => ({ auth })),
  withStyles(styles)
)(NavBar);
