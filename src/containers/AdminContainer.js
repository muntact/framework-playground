import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AdminLayout from '../components/AdminLayout';
import ReportOne from '../components/ReportOne';
import ReportTwo from '../components/ReportTwo';
import ReportThree from '../components/ReportThree';

/* Need a report contianer to do the alignment */
const AdminContainer = props => (
  <AdminLayout
    tabs={[
      <ReportOne users={props.users} />,
      <ReportTwo users={props.users} />,
      <ReportThree users={props.users} />,
    ]}
  />
);

AdminContainer.propTypes = {
  users: PropTypes.array,
};

const mapStateToProps = state => ({
  users: state.users.users,
});

export default connect(mapStateToProps)(AdminContainer);
