import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';

import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import classNames from 'classnames';
import { Grid } from '@material-ui/core';
import DrawerContent from './drawerContent';

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
    height: '100vh'
  },

  // Class specific to just the drawer
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap'
  },

  // Drawer width transitions between closed and open
  // Note: this only affects width and can be (is) used as compensation for other
  // elements to move with the drawer as it opens and closes.
  drawerWidthOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerWidthClosed: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    }
  },

  // App bar transition with drawer open and close
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },

  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },

  toolbar: {
    ...theme.mixins.toolbar,
    paddingRight: 24
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh'
  },

  sideBySide: {
    display: 'flex',
    flexDirection: 'row'
  }
});

class ResponsiveDrawer extends React.Component {
  state = {
    isDrawerOpen: false,
    page: 'setup'
  };

  handleDrawerOpen = () => {
    this.setState(() => ({ isDrawerOpen: true }));
  };

  handleDrawerClose = () => {
    this.setState(() => ({ isDrawerOpen: false }));
  };

  changePage = newPage => {
    this.setState({
      page: newPage,
      isDrawerOpen: false
    });
  };

  render() {
    const { classes, children, theme, campaign } = this.props;
    const { page, isDrawerOpen } = this.state;

    // Recreate the children so we can add the 'page' prop
    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { page })
    );

    return (
      <div className={classes.root}>
        <CssBaseline />

        <AppBar
          position="fixed"
          className={classNames(classes.appBar, isDrawerOpen && classes.appBarShift)}
        >
          <Toolbar disableGutters={!isDrawerOpen}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, isDrawerOpen && classes.menuButtonHidden)}
            >
              <MenuIcon />
            </IconButton>

            <Typography variant="h6" color="inherit" noWrap>
              {campaign && campaign.name}
            </Typography>
          </Toolbar>
        </AppBar>

        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden implementation="css">
            <Drawer
              container={this.props.container}
              variant="permanent"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={isDrawerOpen}
              onClose={this.handleDrawerClose}
              classes={{
                paper: classNames(
                  classes.drawerPaper,
                  classes.drawerWidthOpen,
                  !isDrawerOpen && classes.drawerWidthClosed
                )
              }}
            >
              <DrawerContent
                campaign={campaign}
                page={page}
                changePage={this.changePage}
                handleDrawerClose={this.handleDrawerClose}
              />
            </Drawer>
          </Hidden>
        </nav>

        <main className={classNames(classes.content)}>
          {/* Vertical padding to compensate for navbar */}
          <div className={classes.toolbar} />

          {/* Side by side so we can do horizontal compensation */}
          <div className={classes.sideBySide}>
            {/* Horizontal (Animated) width padding to compensate for drawer opening and closing */}
            <div
              className={classNames(
                classes.test,
                classes.drawerWidthOpen,
                !isDrawerOpen && classes.drawerWidthClosed
              )}
            />

            {/* Display the children */}
            {childrenWithProps}
          </div>
        </main>
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles, { withTheme: true }),
  withRouter
)(ResponsiveDrawer);
