import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardContent,
  Typography,
  CardActions,
  FormControl,
  InputLabel,
  TextField
} from '@material-ui/core';
import classNames from 'classnames';
import ChipInput from './chipInput';

const styles = theme => ({
  card: {},
  darkCard: {
    backgroundColor: 'darkgray',
    color: 'white'
  },
  formControl: {
    width: '100%'
  },
  chipInput: {
    width: '100%'
  }
});

const Section = ({
  classes,
  headerColor,
  title,
  subtitle,
  fields,
  strategyStatement,
  updateStrategyStatement
}) => {
  /**
   * Handles any changes from a text value and updates the strategy statement
   */
  const handleTextChange = key => event => {
    updateStrategyStatement(key, event.target.value);
  };

  /**
   * Add a chip to an array in the strategy statement
   */
  const handleNewChip = key => chipValue => {
    const chips = strategyStatement[key] || [];
    chips.push(chipValue);
    console.log('NEW CHIP');
    updateStrategyStatement(key, chips);
  };

  /**
   * Delete a chip from an array in the strategy statement
   */
  const handleDeleteChip = key => chipValue => {
    const chips = strategyStatement[key] || [];
    // Filter out the one to delete
    const filteredChips = chips.filter(c => c !== chipValue);
    // Update the strat statement
    updateStrategyStatement(key, filteredChips);
  };

  const renderField = field => {
    switch (field.type) {
      case 'text':
        return (
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-multiline-flexible"
              label={field.title}
              fullWidth
              rowsMax="4"
              value={strategyStatement[field.key]}
              onChange={handleTextChange(field.key)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        );
      case 'chips':
        return (
          <ChipInput
            chips={strategyStatement[field.key]}
            label={field.title}
            handleNewChip={handleNewChip(field.key)}
            handleDeleteChip={handleDeleteChip(field.key)}
            className={classes.chipInput}
          />
        );
      default:
        return <Typography>Todo</Typography>;
    }
  };

  return (
    <Card className={classNames(classes.card)}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            R
</Avatar>
        }
        action={<IconButton />}
        title={title}
        subheader={subtitle}
        style={{ backgroundColor: headerColor }}
      />
      <CardContent>
        {fields.map(field => (
          <div>{renderField(field)}</div>
        ))}
      </CardContent>
      {/* <CardActions className={classes.actions} disableActionSpacing>
      <IconButton aria-label="Add to favorites">
        <FavoriteIcon />
      </IconButton>
      <IconButton aria-label="Share">
        <ShareIcon />
      </IconButton>
      <IconButton
        className={classnames(classes.expand, {
          [classes.expandOpen]: this.state.expanded
        })}
        onClick={this.handleExpandClick}
        aria-expanded={this.state.expanded}
        aria-label="Show more"
      >
        <ExpandMoreIcon />
      </IconButton>
    </CardActions> */}
    </Card>
  );
};

Section.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Section);
