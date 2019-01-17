// withNavBar.js - HOC
import React from 'react';
import NavBar from '../components/navBar';

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
          <NavBar />
          <div style={styles.buffer} />
          <Page {...this.props} />
        </div>
      );
    }
  };
