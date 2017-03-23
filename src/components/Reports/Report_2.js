/* eslint-disable class-methods-use-this*/
import React, { Component, PropTypes } from 'react';
import { Gmaps, Marker } from 'react-gmaps';

// deliberately outside the class as it relies on a side effect...
const params = { v: '3.exp', key: window.apiKey };

class ReportTwo extends Component {
  constructor() {
    super();

    this.state = {
      focusedUser: '',
    };

    this.onMapCreated = this.onMapCreated.bind(this);
    this.handleFocusThisUser = this.handleFocusThisUser.bind(this);
  }

  onMapCreated(map) {
    map.setOptions({ disableDefaultUI: true });
  }

  handleFocusThisUser(focusedUser) {
    this.setState({ focusedUser });
  }

  render() {
    // TIL: don't pull this.props off of props, the linter isn't smart enough to follow this '-_-
    const { onMapCreated, handleFocusThisUser } = this;
    const { users } = this.props;

    const markers = users.map(({ address: { geo }, id: key, name }) => {
      const { lat, lng } = geo;
      return (<Marker {...{ key, lat, lng, onMouseOver: () => handleFocusThisUser(name) }} />);
    });

    // must set a default lat, lng so the map can be centered
    // I am using the first user for these coords.
    const centerMapUser = users[0];
    const { lat, lng } = centerMapUser.address.geo;

    return (
      <div>
        <p><b>The last focused user was:</b> {this.state.focusedUser}</p>
        <Gmaps {...{ width: '600px', height: '375px', zoom: 3, loadingMessage: 'loading', lat, lng, params, onMapCreated }}>
          {markers}
        </Gmaps>
      </div>
    );
  }
}

ReportTwo.propTypes = {
  users: PropTypes.array,
};

export default ReportTwo;
