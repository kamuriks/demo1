import React from "react";
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const Map = withGoogleMap(props => {
  const markersElements = props.markers.map(item => (
    <Marker
      key={Math.random()}
      position={{ lat: parseFloat(item.lat), lng: parseFloat(item.lng) }}
    />
  ));

  return (
    <GoogleMap defaultZoom={2} defaultCenter={{ lat: 39.92077, lng: 32.85411 }}>
      {props.isMarkerShown && markersElements}
    </GoogleMap>
  );
});

export default Map;
