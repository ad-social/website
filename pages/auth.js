// auth.js Page
import React from 'react';
import PropTypes from 'prop-types';

import { withRouter } from 'next/router';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withFirebase } from 'react-redux-firebase';
import withNavBar from '../src/withNavBar';

const styles = {
  root: {
    flexGrow: 1,
    textAlign: 'center'
  },
  textField: {
    width: 400
  }
};

class Auth extends React.Component {
  // Create our initial state
  state = {
    email: '',
    password: ''
  };

  // Handle changes from text fields
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // Validate that the data entered is okay
  validateData = () => {
    const { email, password } = this.state;
    return email !== null && email !== '' && password !== null && password !== '';
    // const {
    //   businessName, businessStreetAddress, businessCity, businessState, businessAreaCode, businessType,
    //   email, password
    // } = this.state;

    // if (!businessName || !businessStreetAddress || !businessCity || !businessState || !businessAreaCode || !businessType ||
    //   !email || !password) {
    //     return false
    //   }
  };

  onSubmit = async () => {
    const {
      router: {
        query: { action }
      },
      router,
      firebase
    } = this.props;
    const { email, password } = this.state;

    if (action === 'login') {
      try {
        // Attempt to login, throws error if unsuccesful
        await firebase.login({
          email,
          password
        });

        // Succesful login go back to home screen
        router.push('/');
      } catch (error) {
        this.setState({
          error: 'There is something wrong with your email or password.'
        });
      }
    } else if (action === 'signup') {
      if (!this.validateData()) {
        this.setState({
          error: 'Please enter a valid email and password.'
        });
        return;
      }

      firebase.createUser({ email, password });
    }
  };

  render() {
    // Parse out action telling us whether we should login or signup
    // from props
    const {
      router: {
        query: { action }
      },
      classes
    } = this.props;
    const { email, password, error } = this.state;

    // Make sure users can't just enter whatever action they want
    if (action !== 'login' && action !== 'signup') {
      return <p>Invalid action</p>;
    }

    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} error={error !== null}>
          <TextField
            id="standard-name"
            label="Email"
            className={classes.textField}
            value={email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <br />
          <TextField
            id="standard-name"
            label="Password"
            type="password"
            className={classes.textField}
            value={password}
            onChange={this.handleChange('password')}
            margin="normal"
          />

          <br />
          <FormHelperText id="component-error-text">{error}</FormHelperText>
          <br />

          <Button onClick={this.onSubmit} variant="contained" color="primary">
            {action}
          </Button>
        </FormControl>
      </div>
    );
  }
}

Auth.propTypes = {
  firebase: PropTypes.shape({
    login: PropTypes.func.isRequired,
    createUser: PropTypes.func.isRequired
  })
};
// Composes functions from right to left
export default compose(
  withNavBar,
  withRouter,
  withFirebase,
  withStyles(styles)
)(Auth);
