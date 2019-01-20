import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

// We can inject some CSS into the DOM.
const styles = {
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // borderRadius: 3,
    // border: 0,
    color: 'white',
    // padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)'
  }
};

function SpecialButton(props) {
  const { classes, children, className, ...other } = props;

  return (
    <Button className={`${classes.root} ${className}`} {...other}>
      {children || 'class names'}
    </Button>
  );
}

SpecialButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string
};

export default withStyles(styles)(SpecialButton);