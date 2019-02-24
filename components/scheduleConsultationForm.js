import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class ScheduleConsultationForm extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return <div className={classes.root}>Hello World</div>;
  }
}

ScheduleConsultationForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ScheduleConsultationForm);
