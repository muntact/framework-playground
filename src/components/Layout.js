// @ flow
import React, { PropTypes } from 'react';
import { AppBar } from 'material-ui';

import NavMenu from './NavMenu';

const Layout = ({ children }) => (
  <div style={{ textAlign: 'center' }}>
    <AppBar
      title="Contact List"
      iconElementLeft={<NavMenu />}
    />
    <div style={{ width: '100%' }}>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
