/* eslint-disable class-methods-use-this*/
import React, { Component, PropTypes } from 'react';
import { Gmaps, Marker } from 'react-gmaps';

const params = { v: '3.exp', key: window.apiKey };

class ReportTwo extends Component {
  constructor() {
    super();
    this.state = {
      focusedUser: '',
    };
    this.onMapCreated = this.onMapCreated.bind(this);
  }
  onMapCreated(map) {
    map.setOptions({ disableDefaultUI: true });
  }

  render() {
    // must set a default lat, lng so the map can be centered
    // I am using the first user for these coords.
    const centerMapUser = this.props.users[0];
    const { lat: mapLat, lng: mapLng } = centerMapUser.address.geo;

    return (
      <div>
        <p><b>The last focused user was:</b> {this.state.focusedUser}</p>
        <Gmaps
          width={'600px'}
          height={'375px'}
          zoom={3}
          lat={mapLat}
          lng={mapLng}
          loadingMessage={'Loading'}
          params={params}
          onMapCreated={this.onMapCreated}
        >{
          this.props.users.map((user) => {
            const { address, id, name } = user;
            const { lat, lng } = address.geo;
            return (<Marker
              key={id}
              lat={lat}
              lng={lng}
              onMouseOver={() => {
                this.setState({
                  focusedUser: name,
                });
              }}
            />);
          })
        }</Gmaps>
      </div>
    );
  }
}

ReportTwo.propTypes = {
  users: PropTypes.array,
};

export default ReportTwo;
