import React, { Component, PropTypes } from 'react';
import { TextField } from 'material-ui';

import ContactList from './ContactList';

class SearchableContactList extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(event, newValue) {
    this.setState({ searchText: newValue });
  }

  render() {
    const { users } = this.props;
    const searchText = this.state.searchText.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().indexOf(searchText) > -1);
    return (<div>
      <TextField onChange={this.handleUpdateInput} hintText="Search" />
      <ContactList users={filteredUsers} />
    </div>
    );
  }
}

SearchableContactList.propTypes = {
  users: PropTypes.array,
};

export default SearchableContactList;
