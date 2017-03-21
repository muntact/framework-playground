import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

import AdminLayout from '../components/Layouts/AdminLayout';
import ReportOne from '../components/Reports/Report_1';
import ReportTwo from '../components/Reports/Report_2';
import ReportThree from '../components/Reports/Report_3';

/* Need a report contianer to do the alignment */
const AdminContainer = props => (
  <AdminLayout
    tabs={[
      {
        title: 'Letter Count Report',
        description: 'A table of letters and counts of the contacts first letter of their first name',
        component: <ReportOne users={props.users} />,
      },
      {
        title: 'User Geo-data Report',
        description: `A Map of users geo information on a world map; the users have a marker and an info
          window so that user&quot;s names can be displayed. Note: the markers appear to be in the Ocean.
          I believe that there is probably a transform that should be applied to the coordinates.`,
        component: <ReportTwo users={props.users} />,
      },
      {
        title: 'Generated image catchphrase report',
        description: 'The following report is generated using the memegenerator API',
        component: <ReportThree users={props.users} />,
      },
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
