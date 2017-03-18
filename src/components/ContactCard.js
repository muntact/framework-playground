import React, { PropTypes } from 'react';

const ContactCard = ({ user }) => {
  console.log('GEO', user.address.geo);
  const { address, company, email, name, phone, username, website } = user;
  const { city, /* geo,*/ street, suite, zipcode } = address;
  const { bs, catchphrase, name: companyName } = company;
  return (
    <div>
      <h2>{ name }</h2>
      <div>
        <span>{ city }</span>
        <span>{ street }</span>
        <span>{ suite }</span>
        <span>{ zipcode }</span>
      </div>
      <div>
        <span>{ bs }</span>
        <span>{ catchphrase }</span>
        <span>{ companyName }</span>
      </div>
      <div>{ email }</div>
      <div>{ phone }</div>
      <div>{ username }</div>
      <div>{ website }</div>
    </div>
  );
};

ContactCard.propTypes = {
  user: PropTypes.object,
};

export default ContactCard;
