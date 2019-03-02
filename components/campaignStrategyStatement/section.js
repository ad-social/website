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
import Field from './field';

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

const Section = props => {
  const {
    classes,
    headerColor,
    title,
    subtitle,
    fieldsMetaData,
    strategyStatement,
    updateStrategyStatement
  } = props;

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
        {fieldsMetaData.map(fieldMetaData => (
          <div>
            <Field fieldMetaData={fieldMetaData} {...props} />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

Section.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Section);
