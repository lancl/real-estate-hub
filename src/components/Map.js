/**
 * Key notes:
 * (1) Google Maps' API is no longer free (previously was in 2018); so use the key,
 * MAP_KEY_FAKE, to avoid bill/charge (when the actual data is not needed)
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
      defaultZoom={ZOOM}
      defaultCenter={CENTER}
    />
  </div>
);

export default Map;
