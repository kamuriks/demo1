import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Map = withGoogleMap(props => (
  <GoogleMap defaultZoom={8} defaultCenter={{ lat: 39.92077, lng: 32.85411 }}>
    {props.isMarkerShown && (
      <Marker position={{ lat: 39.92077, lng: 32.85411 }} />
    )}
  </GoogleMap>
));

export default Map;
