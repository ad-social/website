import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Grid, Card, CardContent } from '@material-ui/core';
import { compose } from 'redux';
import withNavBar from '../src/withNavBar';

const styles = theme => ({
  root: {
    display: 'flex',
    paddingTop: 25
  }
});

class Contact extends React.Component {
  state = {};

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center">
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
      </div>
    );
  }
}

Contact.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withStyles(styles),
  withNavBar
)(Contact);
