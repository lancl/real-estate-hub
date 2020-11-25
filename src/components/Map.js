/**
 * Key notes:
 * (1) Google Maps' API is not free; so use the key, MAP_KEY_FAKE, to avoid unwanted charge
 * (2) CSS for this component: the height needs to be set explicitly, as in 'className=
 * "Map"'
 */

import React from "react";

import GoogleMapReact from "google-map-react";
import { MAP_KEY, MAP_KEY_FAKE } from "../config.js";

// The default parameters, for Google Map
const ZOOM = 12;
const CENTER = {
  lat: 47.61,
  lng: -122.34,
};

const Map = () => (
  // <div style={MAP_STYLE}>
  <div className="Map">
    <GoogleMapReact
      bootstrapURLKeys={{ key: MAP_KEY_FAKE }}
      // defaultZoom={ZOOM}
      // defaultCenter={CENTER}
      zoom={ZOOM}
      center={CENTER}
    >
      <div lat={59.955413} lng={30.337844}>
        A
      </div>
      <div lat={59.724465} lng={30.080121}>
        B
      </div>
    </GoogleMapReact>
  </div>
);

export default Map;
