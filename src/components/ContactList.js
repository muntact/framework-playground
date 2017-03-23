import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Divider, List, ListItem } from 'material-ui';

const contactList = ({ users }) => (
  <List>
    {users.map(({ id: key, name: primaryText }) =>
      // For each user, generate a clickable list item and add the divider.
      ([<ListItem {...{ key, primaryText, onClick: () => browserHistory.push(`/contact/${key}`) }} />, <Divider />]))
    }
  </List>
);

contactList.propTypes = {
  users: PropTypes.array,
};

export default contactList;
