import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'next/router';
import { compose, withHandlers } from 'recompose';
import { connect } from 'react-redux';

import { firestoreConnect, isLoaded } from 'react-redux-firebase';
import { CircularProgress } from '@material-ui/core';
import withNavBar from '../src/withNavBar';
import EditCampaignStepper from '../components/editCampaignStepper';

const styles = theme => ({
  root: {
    display: 'flex'
  }
});

class Campaign extends React.Component {
  state = {};

  render() {
    const {
      classes,
      campaign,
      router: {
        query: { id }
      }
    } = this.props;

    if (!isLoaded(campaign)) {
      return <CircularProgress className={classes.progress} />;
    }

    if (campaign.status == 'incomplete') {
      return <EditCampaignStepper />
    }

    return <div className={classes.root}>
Hello World:{id}</div>;
  }
}

Campaign.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(
  withRouter,
  withNavBar,
  firestoreConnect(props => [{ collection: 'campaigns', doc: props.router.query.id }]),
  connect(({ firestore: { data } }, { router: { query: { id } } }) => ({
    campaign: data.campaigns && data.campaigns[id]
  })),
  withHandlers({
    updateCampaign: props => updates =>
      props.firestore.update({ collection: 'campaigns', doc: props.router.query.id }, updates)
  }),
  withStyles(styles)
)(Campaign);
