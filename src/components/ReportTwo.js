/* eslint-disable class-methods-use-this*/
import React, { Component, PropTypes } from 'react';
import { Gmaps, Marker, InfoWindow } from 'react-gmaps';

const params = { v: '3.exp', key: window.apiKey };

class ReportTwo extends Component {
  constructor() {
    super();
    this.onMapCreated = this.onMapCreated.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onCloseClick = this.onCloseClick.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onMapCreated(map) {
    map.setOptions({
      disableDefaultUI: true,
    });
  }

  // TODO: do something cool with the events....
  onDragEnd(e) {
    console.log('onDragEnd', e);
  }

  onCloseClick() {
    console.log('onCloseClick');
  }

  onClick(e) {
    console.log('onClick', e);
  }

  render() {
    // these points appear to be in the ocean....
    const mapCenterUser = this.props.users[0];
    const { lat: mapLat, lng: mapLng } = mapCenterUser.address.geo;

    return (
      <Gmaps
        width={'800px'}
        height={'600px'}
        zoom={3}
        lat={mapLat}
        lng={mapLng}
        loadingMessage={'Loading'}
        params={params}
        onMapCreated={this.onMapCreated}
      >{
        this.props.users.map((user) => {
          const { address, name } = user;
          const { lat, lng } = address.geo;
          return [
            <InfoWindow
              lat={lat}
              lng={lng}
              content={name}
              onCloseClick={this.onCloseClick}
            />,
            <Marker
              lat={lat}
              lng={lng}
              draggable
              onDragEnd={this.onDragEnd}
            />];
        })
      }</Gmaps>
    );
  }
}

ReportTwo.propTypes = {
  users: PropTypes.array,
};

export default ReportTwo;
