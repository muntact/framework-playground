import React, { PropTypes } from 'react';
import { Link } from 'react-router';

const contactList = ({ users }) => (
  <ul>
    {
      users.map(({ address, company, email, id, name, phone, username, website }, index) =>
        // console.log(address, company, email, id, name, phone, username, website);
        (<li key={index}>
          <Link to={`/contact/${id}`}>{name}</Link>
        </li>))
    }
  </ul>
);

contactList.propTypes = {
  users: PropTypes.array,
};

export default contactList;
