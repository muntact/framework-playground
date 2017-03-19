import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SearchableContactList from '../components/SearchableContactList';

const SearchableContactListContainer = ({ users }) =>
  <SearchableContactList users={users} />;

SearchableContactListContainer.propTypes = {
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(SearchableContactListContainer);
