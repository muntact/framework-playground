import React, { Component, PropTypes } from 'react';
import ContactList from './ContactList';

class SearchableContactList extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    this.setState({
      searchText: this.input.value,
    });
  }

  render() {
    const { users } = this.props;
    const searchText = this.state.searchText.toLowerCase();
    const filteredUsers = users.filter(({ name }) => name.toLowerCase().indexOf(searchText) > -1);
    return (<div>
      {/* TODO: change the handleSubmit function to a debounced function: */}
      <input id="search" type="text" ref={(input) => { this.input = input; }} onChange={this.handleSubmit} />
      <ContactList users={filteredUsers} />
    </div>
    );
  }
}

SearchableContactList.propTypes = {
  users: PropTypes.array,
};

export default SearchableContactList;
