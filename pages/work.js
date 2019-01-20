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

class Work extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>Work</div>;
  }
}

Work.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar
)(Work);
