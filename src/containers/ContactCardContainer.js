import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import ContactCard from '../components/ContactCard';

/* This component blocks a loaded render until there is a user. */
const ContactCardContainer = props =>
(<div>
  { props.isLoading &&
    <div>Contact card is Loading</div>
  }
  { !props.isLoading &&
    <ContactCard user={props.user} />
  }
</div>);

ContactCardContainer.propTypes = {
  // TODO: ObjectOf....
  isLoading: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
  isLoading: state.users.fetchStatus === 'NOT_STARTED' || state.users.fetchStatus === 'PENDING',
  user: state.users.users.find(user => user.id === parseInt(ownProps.params.splat, 10)),
});

export default connect(mapStateToProps)(ContactCardContainer);
