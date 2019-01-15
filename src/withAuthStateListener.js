import React from 'react';
import Header from '../components/header';

const styles = {
  root: {
    flexGrow: 1
  }
};

/**
 * WithAuthStateListener
 *   HOC that wraps an auth state listener onto child component.
 *   REQUIRES firebase as a prop
 */
export default Page =>
  class PageWithAuthStateListener extends React.Component {
    state = {
      user: null
    };

    componentWillMount() {
      // add listener
      this.listenForAuthStateChange();
    }

    componentWillUnmount() {
      // decompose auth listener
      if (this.firebaseAuthListener) {
        this.firebaseAuthListener();
      }
      this.firebaseAuthListener = null;
    }

    // Listens for auth state change, and applies the changes to component state
    listenForAuthStateChange = () => {
      const { firebase } = this.props;
      this.firebaseAuthListener = firebase.auth().onAuthStateChanged(user => {
        this.setState(user);
      });
    };

    render() {
      const { user } = this.state;
      return <Page {...this.props} user={user} />;
    }
  };
