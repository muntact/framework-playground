// @ flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../stores/users/actions';
import ContactList from '../components/ContactList';
import logo from './logo.svg';
import './App.css';

// TODO: turn this into something that is called by a layout component.
class App extends Component {
  componentDidMount() {
    const { fetchUsers, fetchUsersSuccess, fetchUsersFailure } = this.props;
    // set the status in flight.
    fetchUsers();
    // setup async result.
    fetch('http://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(fetchUsersSuccess)
      .catch(fetchUsersFailure);
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Contact List</h1>
        </div>
        <div>
          { this.props.isLoading &&
            <span>Is Loading </span>
          }
          { !this.props.isLoading &&
            <ContactList users={this.props.users} />
          }
        </div>
        {this.props.children}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.any,
  fetchUsers: PropTypes.func,
  fetchUsersSuccess: PropTypes.func,
  fetchUsersFailure: PropTypes.func,
  isLoading: PropTypes.bool,
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  isLoading: state.users.fetchStatus === 'NOT_STARTED' || state.users.fetchStatus === 'PENDING',
  users: state.users.users,
});

const mapDispatchToProps = dispatch => ({
  fetchUsers: () => dispatch(actions.fetchUsers),
  fetchUsersSuccess: data => dispatch(actions.fetchUsersSuccess(data)),
  fetchUsersFailure: () => dispatch(actions.fetchUsersFailure),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
