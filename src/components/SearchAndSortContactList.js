import React, { Component, PropTypes } from 'react';
import { Divider, TextField, RaisedButton } from 'material-ui';

import { sortNamesAsc, sortNamesDesc } from '../lib/sortContacts';
import ContactList from './ContactList';

const sortTypes = {
  asc: {
    buttonText: 'Z to A',
    function: sortNamesAsc,
  },
  desc: {
    buttonText: 'A to Z',
    function: sortNamesDesc,
  },
};

class SearchAndSortContactList extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      sorting: sortTypes.asc,
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
    this.handleSortContactsClick = this.handleSortContactsClick.bind(this);
  }

  handleUpdateInput(event, newValue) {
    this.setState({ searchText: newValue });
  }

  handleSortContactsClick() {
    const { searchText, sorting } = this.state;
    this.setState({
      searchText,
      sorting: sortTypes[sorting === sortTypes.asc ? 'desc': 'asc'],
    });
  }

  render() {
    const { users } = this.props;
    const searchText = this.state.searchText.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().indexOf(searchText) > -1);
    const sortedFilteredUsers = this.state.sorting.function(filteredUsers);

    return (<div>
      <TextField onChange={this.handleUpdateInput} hintText="Search" fullWidth />
      <RaisedButton label={`Sort ${this.state.sorting.buttonText}`} onClick={this.handleSortContactsClick} className="col s5 m6 l3" />
      <Divider />
      <ContactList users={sortedFilteredUsers} />
    </div>
    );
  }
}

SearchAndSortContactList.propTypes = {
  users: PropTypes.array,
};

export default SearchAndSortContactList;
