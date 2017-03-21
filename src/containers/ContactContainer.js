import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ContactCardContainer from './ContactCardContainer';
import SearchAndSortContactList from '../components/SearchAndSortContactList';
import ContactLayout from '../components/Layouts/ContactLayout';

const ContactContainer = ({ params, userOnRoute, users }) => {
  const list = <SearchAndSortContactList users={users} />;
  const cardContainer = <ContactCardContainer focusedContact={params.splat} />;

  return userOnRoute ?
    <ContactLayout drawerComponent={list} containerComponent={cardContainer} /> :
      <ContactLayout drawerComponent={undefined} containerComponent={list} />;
};

ContactContainer.propTypes = {
  params: PropTypes.any, // TODO: fix + flow.
  users: PropTypes.array,
  userOnRoute: PropTypes.bool,
};

const mapStateToProps = (state, ownProps) => ({
  users: state.users.users,
  userOnRoute: ownProps.params.splat !== undefined,
});

export default connect(mapStateToProps)(ContactContainer);
