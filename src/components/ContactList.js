import React, { PropTypes } from 'react';

const contactList = ({ users }) => (
  <ul>
    {
      users.map(({ address, company, email, id, name, phone, username, website }, index) => {
        console.log(address, company, email, id, name, phone, username, website);
        return (
          <li key={index}>{name}</li>);
      })
    }
  </ul>
);

contactList.propTypes = {
  users: PropTypes.array,
};

export default contactList;
