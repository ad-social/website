import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Chip, FormControl, TextField, Grid } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex'
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

  // Delete the chip
  handleDelete = chipValue => {
    const { campaign, updateCampaign, prop } = this.props;
    const chips = campaign[prop] || [];
    // Filter out the one to delete
    const filteredChips = chips.filter(c => c !== chipValue);
    // Update the campaign
    updateCampaign({
      [prop]: filteredChips
    });
  };

  // Add a new chip
  handleNew = chipValue => {
    const { campaign, updateCampaign, prop } = this.props;
    const chips = campaign[prop] || [];
    console.log('ADDING TO : ', chips);

    chips.push(chipValue);
    updateCampaign({
      [prop]: chips
    });
  };

  // Detect key presses so we can listen for the enter button
  onKeyPress = ev => {
    const { newChipValue } = this.state;
    if (ev.key === 'Enter') {
      // Prevent deafult
      ev.preventDefault();
      // Create chip
      this.handleNew(newChipValue);
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
    const { classes, campaign, updateCampaign, prop, label, disabled } = this.props;
    const { newChipValue } = this.state;
    const chips = campaign[prop] || [];

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
                  onDelete={disabled ? null : () => this.handleDelete(chip, updateCampaign)}
                  className={classes.chip}
                />
                ))}
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              className={classes.textField}
              onKeyPress={this.onKeyPress}
              value={newChipValue}
              onChange={this.onChange}
              label={label}
              id="margin-none"
              className={classes.textField}
              helperText="Press return to add"
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
