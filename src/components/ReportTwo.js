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
      <div style={{ margin: '20px' }}>
        <h1>User Geo-data Report</h1>
        <p>A Map of users geo information on a world map; the users have a marker and an info
          window so that user&quot;s names can be displayed. Note: the markers appear to be in the Ocean.
          I believe that there is probably a transform that should be applied to the coordinates.
        </p>
        <p><b>The last focused user was:</b> {this.state.focusedUser}</p>
        <div>
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
      </div>
    );
  }
}

ReportTwo.propTypes = {
  users: PropTypes.array,
};

export default ReportTwo;
