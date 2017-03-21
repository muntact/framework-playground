// @ flow
import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'material-ui';

const AdminLayout = ({ tabs }) => (
  <Tabs>{
    tabs.map(({ component, title, description }, index) => (
      <Tab key={index} label={`Report ${index + 1}`}>
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <h1>{title}</h1>
          <p>{description}</p>
          { component }
        </div>
      </Tab>
      ))
  }
  </Tabs>);

AdminLayout.propTypes = {
  tabs: PropTypes.any,
};

export default AdminLayout;
