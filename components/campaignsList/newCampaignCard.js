import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Card, CardActionArea } from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Router from 'next/router';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper
  },
  icon: {
    width: 50,
    height: 50
  },
  centerText: {
    textAlign: 'center',
    color: theme.palette.secondary.main
  },
  cardContainer: {
    minHeight: 200
  },
  cardDisabled: {
    backgroundColor: 'lightgray',
    color: 'white'
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  }
});

function NewCampaignCard(props) {
  const { classes, onClick, disabled } = props;
  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardActionArea
          disabled={disabled}
          className={disabled ? classes.cardDisabled : ''}
          onClick={onClick}
        >
          <div className={classes.section1}>
            <Grid
              container
              className={classes.cardContainer}
              direction="column"
              alignItems="center"
              justify="center"
            >
              <Grid item className={classes.centerText}>
                <Add className={classes.icon} />
                <Typography gutterBottom variant="h5" color="inherit">
                  New Campaign
                </Typography>
              </Grid>
            </Grid>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

NewCampaignCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NewCampaignCard);
