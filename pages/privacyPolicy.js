import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import withNavBar from '../src/withNavBar';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class PrivacyPolicy extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>Privacy Policy</div>;
  }
}

PrivacyPolicy.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar
)(PrivacyPolicy);
