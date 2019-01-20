import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  FormControl,
  Input,
  InputLabel,
  Grid,
  Select,
  MenuItem,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    width: '100%'
  }
});

const objectiveOptions = ['Awareness', 'Drive Traffic to Website'];

const SetupForm = ({ classes, handleTextChange, handleCheckboxChange, campaign }) => (
  <div className={classes.root}>
    <Grid container direction="row" spacing={16}>
      <Grid item xs={7}>
        {/* <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Name</InputLabel>
          <Input id="component-simple" value={campaign.name} onChange={handleChange('name')} />
        </FormControl> */}

        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Platform</FormLabel>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
  checked={campaign.facebook}
  onChange={handleCheckboxChange('facebook')}
  value="facebook"
/>
              }
              label="Facebook"
            />
            <FormControlLabel
              control={
                <Checkbox
  checked={campaign.instagram}
  onChange={handleCheckboxChange('instagram')}
  value="instagram"
/>
              }
              label="Instagram"
            />
            <FormControlLabel
              control={
                <Checkbox
  checked={campaign.snapchat}
  onChange={handleCheckboxChange('snapchat')}
  value="snapchat"
/>
              }
              label="Snapchat"
            />
          </FormGroup>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="component-simple">Objective</InputLabel>
          <Select
            value={campaign.objective}
            onChange={handleTextChange('objective')}
            inputProps={{
              name: 'objective',
              id: 'objective-simple'
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {objectiveOptions.map(objectiveOption => (
              <MenuItem value={objectiveOption}>{objectiveOption}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  </div>
);

SetupForm.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SetupForm);
