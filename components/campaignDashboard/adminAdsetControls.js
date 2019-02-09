import React from 'react';
import PropTypes from 'prop-types';
import { compose, withHandlers, setPropTypes } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import {
  Typography,
  Grid,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button
} from '@material-ui/core';
import classNames from 'classnames';
import Dropzone from 'react-dropzone';
import { withFirebase } from 'react-redux-firebase';
import { adImagesPathV1 } from '../../src/utils';

const styles = theme => ({
  root: {
    backgroundColor: 'red'
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  textField: {
    width: '100%'
  },

  thumbsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  },
  thumb: {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  },
  thumbInner: {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  },

  img: {
    display: 'block',
    width: 'auto',
    height: '100%'
  }
});

class AdminAdsetControls extends React.Component {
  state = {
    status: this.props.adset.status,
    copy: this.props.adset.copy,
    moreInfo: this.props.adset.moreInfo,
    files: []
  };

  componentWillUnmount() {
    // Make sure to revoke the data uris to avoid memory leaks
    this.state.files.forEach(file => URL.revokeObjectURL(file.preview));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  // Uploads files and push's objects containing metadata to database at dbPath
  onFilesDrop = files => {
    this.setState({
      files: files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      )
    });
  };

  onSubmit = async () => {
    const { adset, id, firebase, updateAdset } = this.props;
    const { status, copy, moreInfo, files } = this.state;
    let adImageURL = '';
    // If there is a file to upload
    if (files.length === 1) {
      // Upload the new image
      const adImagesStorageRef = await firebase
        .storage()
        .ref()
        .child(`${adImagesPathV1}/ad-${id}`);

      const snapshot = await adImagesStorageRef.put(files[0]);
      console.log('Uploaded a blob or file!');
      console.log(snapshot);
      adImageURL = await snapshot.ref.getDownloadURL();
    }

    console.log('updating adset');
    console.log('Ad image url: ', adImageURL);
    updateAdset({
      status,
      copy,
      moreInfo,
      adImageURL: adImageURL || ''
    });
  };

  render() {
    const { classes, adset } = this.props;
    const { status, copy, moreInfo, files } = this.state;

    console.log(this.state.files);

    const thumbs = files.map(file => (
      <div className={classes.thumb} key={file.name}>
        <div className={classes.thumbInner}>
          <img src={file.preview} className={classes.img} />
        </div>
      </div>
    ));

    return (
      <div style={{ backgroundColor: '#eee' }}>
        <Grid item xs={12}>
          <Typography variant="h5">
            <b>
              <u>Admin Controls</u>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl>
            <InputLabel htmlFor="name-disabled">Status</InputLabel>
            <Select value={status} onChange={this.handleChange('status')}>
              <MenuItem value="incomplete">Incomplete</MenuItem>
              <MenuItem value="waitingForUser">Waiting For User </MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="Copy"
            multiline
            value={copy}
            onChange={this.handleChange('copy')}
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            id="outlined-multiline-flexible"
            label="More Info"
            multiline
            value={moreInfo}
            onChange={this.handleChange('moreInfo')}
            className={classes.textField}
            margin="normal"
            variant="filled"
          />
        </Grid>

        <Grid item xs={12}>
          <Dropzone accept="image/*" multiple={false} onDrop={this.onFilesDrop}>
            {({ getRootProps, getInputProps, isDragActive }) => (
              <div
                {...getRootProps()}
                className={classNames('dropzone', { 'dropzone--isActive': isDragActive })}
              >
                <input {...getInputProps()} />
                {isDragActive ? (
                  <p>Drop files here...</p>
                ) : (
                  <p>Drag Ad here, or click to select.</p>
                )}
              </div>
            )}
          </Dropzone>
          <aside className={classes.thumbC}>{thumbs}</aside>
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="secondary" onClick={this.onSubmit}>
            Submit
          </Button>
        </Grid>
      </div>
    );
  }
}

AdminAdsetControls.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withFirebase,
  withStyles(styles)
)(AdminAdsetControls);
