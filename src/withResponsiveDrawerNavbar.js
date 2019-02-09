// withNavBar.js - HOC
import React from 'react';
import { connect } from 'react-redux';
import ResponsiveDrawer from '../components/responsiveDrawer';

const styles = {
  root: {
    flexGrow: 1
  },
  buffer: {
    height: 65
  }
};

const WithResponsiveDrawerNavbar = Page =>
  class PageWithNavBar extends React.Component {
    render() {
      return (
        <div style={styles.root}>
          <ResponsiveDrawer {...this.props}>
            <Page {...this.props} />
          </ResponsiveDrawer>
        </div>
      );
    }
  };

export default WithResponsiveDrawerNavbar;
