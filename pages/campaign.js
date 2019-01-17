import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose } from 'recompose';
import withNavBar from '../src/withNavBar';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class Campaign extends React.Component {
  state = {};

  render() {
    const {
      classes,
      router: {
        query: { id }
      }
    } = this.props;

    return <div className={classes.root}>
Hello World:{id}</div>;
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withNavBar,
  withStyles(styles)
)(Campaign);
