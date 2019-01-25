// withNavBar.js - HOC
import React from 'react';
import ResponsiveDrawer from '../components/responsiveDrawer';

const styles = {
  root: {
    flexGrow: 1
  },
  buffer: {
    height: 65
  }
};

export default Page =>
  class PageWithNavBar extends React.Component {
    render() {
      return (
        <div style={styles.root}>
          <ResponsiveDrawer>
            <Page {...this.props} />
          </ResponsiveDrawer>
        </div>
      );
    }
  };
