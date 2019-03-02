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
  TextField,
  Grid,
  Fab,
  Icon
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import ChipInput from './chipInput';

const styles = theme => ({
  root: {
    display: 'flex',
    paddingBottom: '1em'
  },
  fab: {
    margin: theme.spacing.unit
  }
});

const REVISION_SUFFIX = '_revision';

class Field extends React.Component {
  state = {
    isEditControlHidden: false,
    isDisplayDataHidden: true,
    isMouseHover: false
  };

  componentDidMount() {
    const { strategyStatement, fieldMetaData } = this.props;
    // If the SS is ready for the user, default to only show the DisplayData rendering
    if (strategyStatement.isReadyForUser) {
      this.setState({
        isEditControlHidden: true,
        isDisplayDataHidden: false
      });
    }
    // If the field already has a revision, show the edit field
    if (strategyStatement[fieldMetaData.key + REVISION_SUFFIX]) {
      this.setState({
        isEditControlHidden: false
      });
    }
  }

  onMouseEnter = () => {
    this.setState({
      isMouseHover: true
    });
  };

  onMouseLeave = () => {
    this.setState({
      isMouseHover: false
    });
  };

  onEditButtonClick = () => {
    this.setState({
      isEditControlHidden: false
    });
  };

  /**
   * Handles any changes from a text value and updates the strategy statement
   */
  handleTextChange = key => event => {
    const { updateStrategyStatement } = this.props;
    updateStrategyStatement(key, event.target.value);
  };

  /**
   * Add a chip to an array in the strategy statement
   */
  handleNewChip = key => chipValue => {
    const { strategyStatement, updateStrategyStatement } = this.props;
    const chips = strategyStatement[key] || [];
    chips.push(chipValue);
    updateStrategyStatement(key, chips);
  };

  /**
   * Delete a chip from an array in the strategy statement
   */
  handleDeleteChip = key => chipValue => {
    const { strategyStatement, updateStrategyStatement } = this.props;
    const chips = strategyStatement[key] || [];
    // Filter out the one to delete
    const filteredChips = chips.filter(c => c !== chipValue);
    // Update the strat statement
    updateStrategyStatement(key, filteredChips);
  };

  /**
   * Renders an control for the user to edit this field
   * @param {String} fieldKeySuffix - a suffix to append to the field key when entering in the db
   */
  renderEditControl = () => {
    const { classes, profile, fieldMetaData, strategyStatement } = this.props;
    // Key to use when reading or updating from campaignStrategyStatement object
    let { key } = fieldMetaData;
    let label = fieldMetaData.title;
    // If the strategy statement is now directing towards the user and this is
    //  currently the user, anything they edit will be in a sepperate field just
    //  for their edits by adding the suffix _revision
    if (strategyStatement.isReadyForUser && !profile.isAdmin) {
      key += REVISION_SUFFIX;
      label += ' Revision';
    }
    console.log(fieldMetaData.type);
    // Render an edit field depending on what the metadata say this type of data is
    switch (fieldMetaData.type) {
      case 'text':
        return (
          <FormControl className={classes.formControl}>
            <TextField
              id="outlined-multiline-flexible"
              label={label}
              fullWidth
              rowsMax="4"
              multiline
              value={strategyStatement[key]}
              onChange={this.handleTextChange(key)}
              className={classes.textField}
              margin="normal"
              variant="outlined"
            />
          </FormControl>
        );
      case 'chips':
        return (
          <ChipInput
            chips={strategyStatement[key]}
            label={label}
            handleNewChip={this.handleNewChip(key)}
            handleDeleteChip={this.handleDeleteChip(key)}
            className={classes.chipInput}
          />
        );
      default:
        return <Typography>Todo Control</Typography>;
    }
  };

  /**
   * Render a component that just displays the data for this field
   * @param {Object} field - metadata for this field
   */
  renderDisplayData = field => {
    const { classes, profile, fieldMetaData, strategyStatement } = this.props;
    const { isMouseHover } = this.state;
    switch (fieldMetaData.type) {
      case 'text':
        return (
          <Grid
            container
            justify="center"
            alignItems="center"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <Grid item xs={10}>
              <Typography variant="title">{fieldMetaData.title}</Typography>
              <Typography variant="subtitle1">{strategyStatement[fieldMetaData.key]}</Typography>
            </Grid>
            <Grid item xs={2}>
              {!profile.isAdmin && isMouseHover ? (
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="Edit"
                  onClick={this.onEditButtonClick}
                  className={classes.fab}
                >
                  <EditIcon fontSize="small" />
                </Fab>
              ) : null}
            </Grid>
          </Grid>
        );
      case 'chips':
        return (
          <Grid
            container
            justify="center"
            alignItems="center"
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
          >
            <Grid item xs={10}>
              <Typography variant="title">{fieldMetaData.title}</Typography>
              <ChipInput
                chips={strategyStatement[fieldMetaData.key]}
                label={fieldMetaData.title}
                disabled
                hideInput
                className={classes.chipInput}
              />
            </Grid>
            <Grid item xs={2}>
              {!profile.isAdmin && isMouseHover ? (
                <Fab
                  size="small"
                  color="secondary"
                  aria-label="Edit"
                  onClick={this.onEditButtonClick}
                  className={classes.fab}
                >
                  <EditIcon fontSize="small" />
                </Fab>
              ) : null}
            </Grid>
          </Grid>
        );
      default:
        return <Typography>Todo Display</Typography>;
    }
  };

  render() {
    const { classes, profile, strategyStatement } = this.props;
    const { isDisplayDataHidden, isEditControlHidden } = this.state;
    return (
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          {isDisplayDataHidden ? null : this.renderDisplayData()}
        </Grid>
        <Grid item xs={12}>
          {isEditControlHidden ? null : this.renderEditControl()}
        </Grid>
      </Grid>
    );
  }
}

Field.propTypes = {
  classes: PropTypes.object.isRequired,
  strategyStatement: PropTypes.object.isRequired,
  updateStrategyStatement: PropTypes.func.isRequired
};

export default compose(
  withStyles(styles),
  connect(({ firebase: { profile } }) => ({
    profile
  }))
)(Field);
