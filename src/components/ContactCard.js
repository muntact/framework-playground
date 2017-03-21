import React, { PropTypes } from 'react';

const ContactCard = ({ user }) => {
  const { address, company, email, name, phone, website } = user;
  const { city, street, suite, zipcode } = address;
  const { bs, catchPhrase, name: companyName } = company;

  return (
    <div className="row">
      <div className="col s12 m12 l10">
        <div className="card deep-purple orange-text text-accent-2">
          <div className="card-content">
            <span className="card-title">{name}</span>
            <div className="row" style={{ textAlign: 'left' }}>
              <div className="col s6 m6 l6">
                <div><b>Address:</b></div>
                <div>{city}</div>
                <div>{street}</div>
                <div>{suite}</div>
                <div>{zipcode}</div>
              </div>
              <div className="col s6 m6 l6">
                <div><b>Company:</b></div>
                <div>{companyName}</div>
                <div>{bs}</div>
                <div>{catchPhrase}</div>
              </div>
            </div>
            <div className="card-action">
              <a href={`mailto:${email}`}>Email</a>
              <a href={`tel:${phone}`}>Phone</a>
              <a href={`http://${website}`}>Website</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContactCard.propTypes = {
  user: PropTypes.object,
};

export default ContactCard;
