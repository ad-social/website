import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { Card, CardActionArea } from '@material-ui/core';
import Router from 'next/router';

const styles = theme => ({
  root: {
    width: '100%',
    maxWidth: 300,
    borderRadius: 8,
    backgroundColor: theme.palette.background.paper
  },
  cardContainer: {
    minHeight: 200
  },
  // actionArea: {
  //   minHeight: 300
  // },
  chip: {
    marginRight: theme.spacing.unit
  },
  section1: {
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`
  },
  section2: {
    margin: theme.spacing.unit * 2,
    minHeight: 100
  },
  section3: {
    margin: `${theme.spacing.unit * 6}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`
  }
});

function formatStatus(status) {
  switch (status) {
    case 'incomplete':
      return 'Incomplete Details';
    case 'review':
      return 'Review in progress';
    default:
      return '';
  }
}

function CampaignCard(props) {
  const { classes, campaign, onClick } = props;
  return (
    <Grid item xs={12} sm={4}>
      <Card className={classes.root}>
        <CardActionArea className={classes.actionArea} onClick={() => onClick(campaign.id)}>
          <div className={classes.section1}>
            <Grid
              container
              className={classes.cardContainer}
              direction="column"
              alignItems="flex-start"
            >
              <Grid item>
                <Typography gutterBottom variant="h5">
                  {campaign.name}
                </Typography>
                <Typography color="textSecondary">{formatStatus(campaign.status)}</Typography>
              </Grid>
            </Grid>
          </div>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

CampaignCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CampaignCard);
