import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import SpecialButton from '../specialButton';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

const NextButton = ({ classes, activeStep, steps, handleNext, handleSubmit }) => {
  if (activeStep === steps.length - 1) {
    return <SpecialButton onClick={handleSubmit}>Submit For Review</SpecialButton>;
  }

  return (
    <Button variant="contained" color="primary" onClick={handleNext} className={classes.button}>
      Next
    </Button>
  );
};

NextButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NextButton);
