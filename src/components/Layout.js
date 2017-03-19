// @ flow
import React, { PropTypes } from 'react';
import { AppBar } from 'material-ui';

import NavMenu from './NavMenu';
import '../containers/App.css';

const Layout = ({ children }) => (
  <div className="App">
    <AppBar
      title="Contact List"
      iconElementLeft={<NavMenu />}
    />
    <div>{children}</div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.any,
};

export default Layout;
