import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import Grid from '@material-ui/core/Grid';
import withNavBar from '../src/withNavBar';

const styles = {};

const Dashboard = props => <Grid container>Dashboard</Grid>;

export default compose(
  withNavBar,
  withStyles(styles)
)(Dashboard);
