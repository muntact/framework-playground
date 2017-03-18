import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ReportOne from '../components/ReportOne';
import ReportTwo from '../components/ReportTwo';
import ReportThree from '../components/ReportThree';

/* This component blocks a loaded render until there is a user. */
const AdminContainer = props =>
(<div>
  { props.isLoading &&
    <div>Admin page is Loading</div>
  }
  { !props.isLoading &&
    <div>
      <h1>Reports</h1>
      <h2>Report One</h2>
      <ReportOne users={props.users} />
      <h2>Report Three</h2>
      <ReportThree users={props.users} />
      <h2>Report Two</h2>
      <ReportTwo users={props.users} />
    </div>
  }
</div>);

AdminContainer.propTypes = {
  isLoading: PropTypes.bool,
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  isLoading: state.users.fetchStatus === 'NOT_STARTED' || state.users.fetchStatus === 'PENDING',
  users: state.users.users,
});

export default connect(mapStateToProps)(AdminContainer);
