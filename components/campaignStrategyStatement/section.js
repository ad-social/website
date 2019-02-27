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

const styles = theme => ({
  card: {},
  darkCard: {
    backgroundColor: 'darkgray',
    color: 'white'
  },
  formControl: {
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
      default:
        return null;
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
