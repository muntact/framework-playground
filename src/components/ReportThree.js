import React, { PropTypes } from 'react';

const ReportThree = ({ users }) => (
  <div>{
    users.map((user) => {
      const { company, id, name, address } = user;
      const { city, street, suite, zipcode } = address;
      const { catchphrase } = company;
      const dimensions = { width: 600, height: 400 };
      return (
        <div
          key={id}
          style={{
            width: dimensions.width,
            height: dimensions.height,
            // offset by 20 because the first couple of images are of laptops....
            // also unsplash is used because the alts are a bit weird...
            // ( could use something like memegenerator )
            backgroundImage: `url(https://unsplash.it/${dimensions.width}/${dimensions.height}/?image=${20 + id})`,
          }}
        >
          <span>{catchphrase}</span>
          <span>{name}</span>
          <span>{ city }</span>
          <span>{ street }</span>
          <span>{ suite }</span>
          <span>{ zipcode }</span>
        </div>);
    })
  }</div>
);

ReportThree.propTypes = {
  users: PropTypes.array,
};

export default ReportThree;
