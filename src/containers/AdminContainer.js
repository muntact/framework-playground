import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import ReportOne from '../components/ReportOne';
import ReportTwo from '../components/ReportTwo';
import ReportThree from '../components/ReportThree';

const AdminContainer = props =>
(<div>
  <h1>Reports</h1>
  <h2>Report One</h2>
  <ReportOne users={props.users} />
  <h2>Report Three</h2>
  <ReportThree users={props.users} />
  <h2>Report Two</h2>
  <ReportTwo users={props.users} />
</div>);

AdminContainer.propTypes = {
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(AdminContainer);
