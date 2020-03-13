import React, { Component } from 'react';
import { Cacher } from '../../services/cacher';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Circle,
  InfoWindow
} from 'react-google-maps';

const MapComponent = props => {
  const { coordinates, isError, isLocationLoaded } = props;
  return (
    <GoogleMap
      defaultZoom={14}
      defaultCenter={coordinates}
      center={coordinates}
      options={{ disableDefaultUI: isError ? true : false }}
    >
      {isLocationLoaded && !isError && (
        <Circle center={coordinates} radius={500} />
      )}
      {isLocationLoaded && isError && (
        <InfoWindow position={coordinates} options={{ maxWidth: 300 }}>
          <div>
            There is a problem to find location on the map, we are trying to
            resolve problem as fast as possible, Contact host for additional
            informations if you are still interested in booking this place. We
            are sorry for inconvenience.
          </div>
        </InfoWindow>
      )}{' '}
    </GoogleMap>
  );
};

function withGeocode(WrappedComponent) {
  return class extends Component {
    constructor() {
      super();
      this.cacher = new Cacher();
      this.state = {
        coordinates: {
          lat: 0,
          lng: 0
        },
        isError: false,
        isLocationLoaded: false
      };
    }
    componentDidMount() {
      this.getGeocodedLocation();
    }
    updateCoordinates(coordinates) {
      this.setState({
        coordinates,
        isLocationLoaded: true
      });
    }
    geocodeLocation(location) {
      return new Promise((resolve, reject) => {
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: location }, (result, status) => {
          if (status === 'OK') {
            const geometry = result[0].geometry.location;
            const coordinates = { lat: geometry.lat(), lng: geometry.lng() };
            this.cacher.cacheValue(location, coordinates);

            resolve(coordinates);
          } else {
            reject('ERRORRR');
          }
        });
      });
    }

    getGeocodedLocation() {
      const location = this.props.location;
      // const location = 'dssssssssssssssssss';

      if (this.cacher.isValueCached(location)) {
        this.updateCoordinates(this.cacher.getCacheValue(location));
      } else {
        this.geocodeLocation(location).then(
          coordinates => {
            this.updateCoordinates(coordinates);
          },
          error => {
            this.setState({ isError: true, isLocationLoaded: true });
          }
        );
      }
    }
    render() {
      return <WrappedComponent {...this.state} />;
    }
  };
}

export const MapWithGeocode = withScriptjs(
  withGoogleMap(withGeocode(MapComponent))
);
