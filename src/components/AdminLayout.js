// @ flow
import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui';

const AdminLayout = ({ tabs }) => (
  <Tabs>{
    tabs.map((tab, index) => (
      <Tab key={index} label={`Report ${index + 1}`}>
        <div>
          { tab }
        </div>
      </Tab>
      ))
  }
  </Tabs>);

AdminLayout.propTypes = {
  tabs: PropTypes.any,
};

export default AdminLayout;
