import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chip, FormControl, TextField, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100%'
  },
  textField: {
    width: '100%'
  },
  chip: {
    margin: theme.spacing.unit
  }
});

class ChipInput extends React.Component {
  state = {
    newChipValue: ''
  };

  // Detect key presses so we can listen for the enter button
  onKeyPress = ev => {
    const { handleNewChip } = this.props;
    const { newChipValue } = this.state;
    if (ev.key === 'Enter') {
      // Prevent deafult
      ev.preventDefault();
      // Create chip
      handleNewChip(newChipValue);
      // Reset new chip value
      this.setState({
        newChipValue: ''
      });
    }
  };

  // Update newChipValue whenever a change happens
  onChange = event => {
    this.setState({
      newChipValue: event.target.value
    });
  };

  render() {
    const { classes, chips, label, disabled, handleDeleteChip } = this.props;
    const { newChipValue } = this.state;

    return (
      <div className={classes.root}>
        <Grid container direction="row">
          <Grid item xs={12}>
            {chips == null
              ? ''
              : chips.map(chip => (
                  <Chip
                  key={chip}
                  label={chip}
                  onDelete={disabled ? null : () => handleDeleteChip(chip)}
                  className={classes.chip}
                />
                ))}
          </Grid>
          <Grid item xs={12}>
            <TextField
              className={classes.textField}
              onKeyPress={this.onKeyPress}
              value={newChipValue}
              onChange={this.onChange}
              label={label}
              id="margin-none"
              className={classes.textField}
              helperText="Press return to add a new tag"
              disabled={disabled}
            />
          </Grid>
        </Grid>
      </div>
    );
  }
}

ChipInput.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipInput);
