import React from "react";
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";

const RenderMarkers = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCfts7ICdfHE1B_5_FAwYR9OchyGr5_9VE&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={18} defaultCenter={{ lat: props.lat, lng: props.long }}>
    
    {props.isMarkerShown && props.data.map((signLocation, i) => {
        return (
          <Marker 
            key={i} 
            position={{ 
              lat: Number(signLocation.latitude), 
              lng: Number(signLocation.longitude) 
            }} 
          />
        )
    })}
  </GoogleMap>
));
export default RenderMarkers;