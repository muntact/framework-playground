import React, { PropTypes } from 'react';
import { browserHistory } from 'react-router';
import { Divider, List, ListItem } from 'material-ui';

const contactList = ({ users }) => (
  <List>
    {users.map(({ id, name }) =>
      ([<ListItem
        key={id}
        primaryText={name}
        onClick={() => browserHistory.push(`/contact/${id}`)}
      />, <Divider />,
      ]))
    }
  </List>
);

contactList.propTypes = {
  users: PropTypes.array,
};

export default contactList;
