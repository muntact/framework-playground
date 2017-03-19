// @ flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CircularProgress } from 'material-ui';

import * as actions from '../stores/users/actions';

import Layout from '../components/Layout';

// TODO: rename this...
class App extends Component {
  componentDidMount() {
    const { fetchUsers, fetchUsersSuccess, fetchUsersFailure } = this.props;
    // set the status in flight.
    fetchUsers();
    // setup async result.
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then((data) => {
        setTimeout(() => {
          fetchUsersSuccess(data);
        }, 2000);
      })
      // .then(fetchUsersSuccess)
      .catch(fetchUsersFailure);
  }
  render() {
    return (
      <Layout>
        { this.props.isLoading &&
          <CircularProgress size={80} thickness={5} />
        }
        { !this.props.isLoading &&
          this.props.children
        }
      </Layout>
    );
  }
}

App.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
