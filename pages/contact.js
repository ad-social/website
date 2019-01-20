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

class Contact extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>Contact us</div>;
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar
)(Contact);
