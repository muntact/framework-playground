import React, { PropTypes } from 'react';

import './ContactLayout.css';

// If components.length > 1 then there is a focused contact, else there is only the list.
const ContactLayout = ({ drawerComponent, containerComponent }) => (
  drawerComponent ?
  (
    <div>
      <div className="side-nav fixed">
        {drawerComponent}
      </div>
      <main>
        <div className="container">
          {containerComponent}
        </div>
      </main>
    </div>
  ) : (
    <div className="container">
      {containerComponent}
    </div>
  )
);

ContactLayout.propTypes = {
  drawerComponent: PropTypes.any, // TODO: undefined or react Element.
  containerComponent: PropTypes.any,
};


export default ContactLayout;
