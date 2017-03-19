import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ContactCardContainer from './ContactCardContainer';
import SearchableContactListContainer from './SearchableContactListContainer';

import './ContactContainer.css';
// If there is no user on route, render the list as a list.
// If there is a user on route, render list as a docked item.
const ContactContainer = ({ userOnRoute, params }) =>
  (userOnRoute ?
  (<div>
    <div className="side-nav fixed">
      <SearchableContactListContainer />
    </div>
    <main>
      <div className="container">
        <ContactCardContainer focusedContact={params.splat} />
      </div>
    </main>
  </div>):
    <SearchableContactListContainer />);

ContactContainer.propTypes = {
  userOnRoute: PropTypes.bool,
  params: PropTypes.any, // TODO: fix + flow.
};

const mapStateToProps = (state, ownProps) => ({
  userOnRoute: ownProps.params.splat !== undefined,
});

export default connect(mapStateToProps)(ContactContainer);
