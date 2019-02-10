import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField
} from '@material-ui/core';
import { compose } from 'recompose';
import { withFirebase } from 'react-redux-firebase';
import AdminAdsetControls from './adminAdsetControls';
import SwitchComponent from '../switchComponent';
import { adImagesPathV1 } from '../../src/utils';
import SpecialButton from '../specialButton';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  }
});

class Adset extends React.Component {
  state = {
    selectedAdsetVersionIndex: 0,
    adsetVersionDenialReason: ''
  };

  componentDidMount() {
    const { adset } = this.props;
    const { versions } = adset;
    // If there are versions, set the selected version to the most recent one
    if (versions && versions.length > 0) {
      this.setState({
        selectedAdsetVersionIndex: versions.length - 1
      });
    }
  }

  handleSelectChange = key => event => {
    this.setState({ [key]: event.target.value });
  };

  render() {
    const { selectedAdsetVersionIndex, adsetVersionDenialReason } = this.state;
    const { classes, profile, adset, id, acceptAdsetVersion, denyAdsetVersion } = this.props;
    const { versions, acceptedVersion } = adset;
    const selectedAdsetVersion = versions[selectedAdsetVersionIndex];

    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="subtitle1">
            This is where we will work together in getting your perfect ad ready. You can also
            control the adset from here.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {versions.length === 0 ? (
              <Typography variant="subtitle1">
                You're adset isn't ready yet! We're working on it right now and it will be ready
                within 3 business days.
              </Typography>
            ) : (
              <div>
                <FormControl className={classes.formControl}>
                  <InputLabel>Version</InputLabel>
                  <Select
                    value={this.state.selectedAdsetVersionIndex}
                    onChange={this.handleSelectChange('selectedAdsetVersionIndex')}
                  >
                    {Array.from(Array(versions.length).keys()).map(i => (
                      <MenuItem value={i}>
                        Version
                        {i}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <br />

                <SwitchComponent show={selectedAdsetVersion.denied === true}>
                  NOTICE: This is an old adset version that was denied.
                </SwitchComponent>
                <br />

                <Grid item xs={12}>
                  <img alt="not found" src={selectedAdsetVersion.adImageURL} />
                  <Typography variant="h6">
                    <b>
                      <u>Copy</u>
                    </b>
                  </Typography>
                  <Typography variant="subtitle2">{selectedAdsetVersion.copy}</Typography>
                  <Typography variant="h6">
                    <b>
                      <u>More Info</u>
                    </b>
                  </Typography>
                  <Typography variant="subtitle2">{selectedAdsetVersion.moreInfo}</Typography>
                </Grid>

                <SwitchComponent
                  show={acceptedVersion === false && selectedAdsetVersion.denied === false}
                >
                  <TextField
                    id="outlined-textarea"
                    label="Review Denial Reason"
                    placeholder="Why is this review getting denied?"
                    multiline
                    className={classes.textField}
                    margin="normal"
                    variant="outlined"
                    onChange={event =>
                      this.setState({ adsetVersionDenialReason: event.target.value })
                    }
                  />
                  <br />
                  <SpecialButton
                    onClick={() => denyAdsetVersion(id, adset, adsetVersionDenialReason)}
                  >
                    Deny
                  </SpecialButton>
                  <br />
                  <br />
                  <SpecialButton onClick={() => acceptAdsetVersion(id)}>Accept</SpecialButton>
                </SwitchComponent>
              </div>
            )}
            <SwitchComponent show={profile.isAdmin === true}>
              <AdminAdsetControls {...this.props} />
            </SwitchComponent>
          </Paper>
        </Grid>

        {/* <Grid item xs={12}>
          <SwitchComponent show={status === 'waitingForUser'}>
            <Button
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => acceptAdsetVersion(id)}
            >
              Accept
            </Button>
            <Button color="primary" variant="contained" className={classes.button}>
              Deny
            </Button>
          </SwitchComponent>
        </Grid> */}
      </Grid>
    );
  }
}

Adset.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  withStyles(styles)
)(Adset);
