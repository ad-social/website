import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { compose } from 'redux';
import withNavBar from '../src/withNavBar';

const styles = theme => ({
  root: {
    paddingTop: 50
  }
});

class Contact extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <Grid container spacing={0} justify="center" className={classes.root}>
        <Grid item xs={10}>
          <Card>
            <CardContent>
              <Typography variant="h2">Contact Us</Typography>
              <Typography variant="subtitle1">
                If you have any questions, feel free to email either of our founders:
              </Typography>
              <br />
              <Typography variant="subtitle1">
                <b>Sam Lambert</b>
                <br />
                sam@adsocial.us
              </Typography>
              <Typography variant="subtitle1">
                <b>Zac Holland</b>
                <br />
                zac@adsocial.us
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withNavBar,
  withStyles(styles)
)(Contact);
