// @ flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui';

import * as actions from '../stores/users/actions';
import getUsers from '../service/users';

import ApplicationLayout from '../components/Layouts/ApplicationLayout';

class ApplicationWrapper extends Component {
  componentDidMount() {
    const { fetchUsers, fetchUsersSuccess, fetchUsersFailure } = this.props;
    // set the status in flight.
    fetchUsers();
    // setup async result.
    getUsers(fetchUsersSuccess, fetchUsersFailure);
  }

  render() {
    const { isLoading, children } = this.props;
    return (
      <ApplicationLayout>
        { isLoading &&
          <div style={{ marginTop: '100px' }}>
            <CircularProgress size={80} thickness={5} />
          </div>
        }
        { !isLoading &&
          children
        }
      </ApplicationLayout>
    );
  }
}

ApplicationWrapper.propTypes = {
  children: PropTypes.any,
  fetchUsers: PropTypes.func,
  fetchUsersSuccess: PropTypes.func,
  fetchUsersFailure: PropTypes.func,
  isLoading: PropTypes.bool,
};

const mapStateToProps = state => ({
  isLoading: state.users.fetchStatus === 'NOT_STARTED' || state.users.fetchStatus === 'PENDING',
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(actions.fetchUsers),
  fetchUsersSuccess: data => dispatch(actions.fetchUsersSuccess(data)),
  fetchUsersFailure: () => dispatch(actions.fetchUsersFailure),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationWrapper);
