import React, { Component, PropTypes } from 'react';
import ContactList from './ContactList';
// import { connect } from 'react-redux';
// import ContactCard from '../components/ContactCard';

/* This component blocks a loaded render until there is a user. */
class SearchableContactList extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    // alert('A name was submitted: ' + this.input.value);
    this.setState({
      searchText: this.input.value,
    });
    event.preventDefault();
  }

  render() {
    const { users } = this.props;
    const searchText = this.state.searchText.toLowerCase();
    const filteredUsers = users.filter(({ name }) =>
      name.toLowerCase().indexOf(searchText) > -1);
    return (<div>
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="search">
          Search:
          <input id="search" type="text" ref={(input) => { this.input = input; }} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ContactList users={filteredUsers} />
    </div>
    );
  }
}

SearchableContactList.propTypes = {
  users: PropTypes.array,
};

export default SearchableContactList;
