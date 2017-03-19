import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContactCard from '../components/ContactCard';

// TODO: add the ContactCard container to a left nav slider.
const ContactCardContainer = props =>
(<div>
  <ContactCard user={props.user} />
</div>);

ContactCardContainer.propTypes = {
  user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  user: state.users.users.find(user => user.id === parseInt(ownProps.params.splat, 10)),
});

export default connect(mapStateToProps)(ContactCardContainer);
