// withNavBar.js - HOC
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import NavBar from '../components/navBar';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  buffer: theme.mixins.toolbar
});

export default Page => {
  class PageWithNavBar extends React.Component {
    render() {
      return (
        <div style={styles.root}>
          <NavBar />
          <div style={styles.buffer} />
          <Page {...this.props} />
        </div>
      );
    }
  }

  return withStyles(styles)(PageWithNavBar);
};

// export default withStyles(styles)(WithNavbarHOC);
