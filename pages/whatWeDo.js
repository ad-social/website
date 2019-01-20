import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import withNavbar from '../src/withNavBar';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class WhatWeDo extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>What we do</div>;
  }
}

WhatWeDo.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavbar
)(WhatWeDo);
