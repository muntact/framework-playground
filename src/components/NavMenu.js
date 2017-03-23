import React, { PropTypes } from 'react';
// import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import { IconMenu, IconButton, MenuItem } from 'material-ui';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

const NavMenu = () => (
  <IconMenu iconButtonElement={<IconButton><MenuIcon /></IconButton>}>
    <LinkedMenuItem route="/" menuText="Home" />
    <LinkedMenuItem route="/admin" menuText="Administration" />
  </IconMenu>);


// TODO: smooth the hiding of the drop down on navigation...?
const LinkedMenuItem = ({ route, menuText: primaryText }) =>
  <MenuItem {...{ primaryText, onClick: () => browserHistory.push(route) }} />;

LinkedMenuItem.propTypes = {
  route: PropTypes.string.isRequired,
  menuText: PropTypes.string.isRequired,
};


export default NavMenu;
