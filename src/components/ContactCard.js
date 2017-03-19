import React, { PropTypes } from 'react';

const ContactCard = ({ user }) => {
  const { address, company, id, email, name, phone, username, website } = user;
  const { city, street, suite, zipcode } = address;
  const { bs, catchphrase, name: companyName } = company;
  const dimensions = { width: 500, height: 250 };

  return (
    <div className="row">
      <div className="col s12 m12 l10">
        <div className="card">
          <div className="card-image">
            <img
              src={`https://unsplash.it/${dimensions.width}/${dimensions.height}/?image=${20 + id}`}
              alt=""
              className="s12 m12 l10"
            />
          </div>
          <div className="card-content">
            <span className="card-title">{name}</span>
            <div className="row">
              <div className="col s4 m4 l4">
                <span>{ city }</span>
                <span>{ street }</span>
                <span>{ suite }</span>
                <span>{ zipcode }</span>
              </div>
              <div className="col s4 m4 l4">
                <span>{ bs }</span>
                <span>{ catchphrase }</span>
                <span>{ companyName }</span>
              </div>
              <div className="col s4 m4 l4">
                <a href={`http://${website}`}>{website}</a>
                <div>{ username }</div>
              </div>
            </div>
            <div className="card-action">
              <a href={`mailto:${email}`}>{email}</a>
              <a href={`tel:${phone}`}>{phone}</a>
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
