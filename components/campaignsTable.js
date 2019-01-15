import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import CircularProgress from '@material-ui/core/CircularProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = {
  table: {
    width: '100%'
  }
};

const CampaignsTable = ({ classes, campaigns }) => {
  if (!isLoaded(campaigns)) {
    return <CircularProgress className={classes.progress} color="secondary" />;
  }

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {campaigns.map(row => (
          <TableRow key={row.id}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

CampaignsTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(CampaignsTable);
