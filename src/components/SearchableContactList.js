import React, { Component, PropTypes } from 'react';
import { AutoComplete } from 'material-ui';

import ContactList from './ContactList';

class SearchableContactList extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
    this.handleUpdateInput = this.handleUpdateInput.bind(this);
  }

  handleUpdateInput(searchText) {
    this.setState({ searchText });
  }

  handleNewRequest() {
    this.setState({ searchText: '' });
  }

  render() {
    const { users } = this.props;
    const searchText = this.state.searchText.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().indexOf(searchText) > -1);
    const dataSource = users.map(({ name }) => name); // const.

    // TODO: don't really like the autocomplete dropping over lists when its super short...
    // maybe address this :/
    return (<div>
      <AutoComplete
        floatingLabelText="Search"
        filter={AutoComplete.fuzzyFilter}
        dataSource={dataSource}
        maxSearchResults={5}
        searchText={this.state.searchText}
        onUpdateInput={this.handleUpdateInput}
        openOnFocus
      />
      <ContactList users={filteredUsers} />
    </div>
    );
  }
}

SearchableContactList.propTypes = {
  users: PropTypes.array,
};

export default SearchableContactList;
