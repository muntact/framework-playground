import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContactCard from '../components/ContactCard';

// TODO: add the ContactCard container to a left nav pane
const ContactCardContainer = props =>
// Padding is for the drawer.
(<div style={{ margin: '30px 0px' }}>
  <ContactCard user={props.user} />
</div>);

ContactCardContainer.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state, { focusedContact }) => ({
  user: state.users.users.find(user => user.id === parseInt(focusedContact, 10)),
});

export default connect(mapStateToProps)(ContactCardContainer);
