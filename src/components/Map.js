/**
 * Key note(s):
 * (1) CSS in JS: some styles are required to be defined at the parent component,
 * <Map>; whereas the styles do not seem to work via 'className' (i.e. App.css)
 * (2) HoC (higher-order component): via the module 'compose'; per sample/ref codes
 */

import React from "react";
import { compose } from "recompose";
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
  InfoWindow,
} from "react-google-maps";

// Note: use MAP_KEY_FAKE to avoid un-necessary charge (e.g. when testing other features)
import { MAP_KEY, MAP_KEY_FAKE } from "../config.js";

/**
 * The default parameters
 * Note: there is some bug with saving the params in a separate file (e.g.
 * mapParams.js); due to variable value as a HTML element
 */

const ZOOMS = {
  default: 3.5,
  big: 8,
};
const MARKERS = [
  { lat: 39.83, lng: -98.58, city: "Center of US" },
  { lat: 45.51, lng: -122.68, city: "Portland, OR" }, // Portland
];

const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`;

const LOADING_ELEMENT = <div style={{ height: `90%` }} />;
const MAP_ELEMENT = <div style={{ height: `90%` }} />;
const CONTAINER_ELEMENT = <div style={{ height: `35vh` }} />; // For <GoogleMap/> container

/**
 * Helper functions
 */

// About: dynamicaly set up zoom parameter
const getDefaultZoom = (markers) => {
  // Exception(s) checkk
  if (!markers.length) return ZOOMS.default;

  if (markers.length === 1) {
    return ZOOMS.big;
  }

  const [marker1, marker2] = markers;
  // If the 2 markers are closer by, set bigger zoom
  if (
    marker1.lat &&
    marker2.lat &&
    Math.abs(marker1.lat - marker2.lat) < 30 &&
    Math.abs(marker1.lng - marker2.lng) < 30
  ) {
    return ZOOMS.big;
  }

  // Else: set smaller zoom
  return ZOOMS.default;
};

const getDefaultCenter = (markers) => {
  if (!markers.length) return MARKERS[0];
  return markers[0];
};

/**
 * Components: parent and child
 */

// About: parent component
// Note: use a class for <Map/>, in order to clear markers when needed
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerElements: [], // Note: it is the HTML element(s), not just JS
    };
  }

  //
  componentDidUpdate(prevProps) {
    const { markers } = this.props;
    if (markers !== prevProps.markers) {
      alert(`[Map] componentDidUpdate, for prop markers!`);
      if (this.props.showMarkers) {
        this.setState({
          markerElements: this.generateMarkerElements(markers),
        });
      } else {
        this.setState({
          markerElements: [],
        });
      }
    }
  }

  // About: generate HTML elements, for input markers
  generateMarkerElements = (markers) => {
    const output = [];
    markers.map((marker) => {
      output.push(<Marker position={{ lat: marker.lat, lng: marker.lng }} />);
    });
    return output;
  };

  render() {
    return (
      <MapWithMarker
        googleMapURL={MAP_URL}
        loadingElement={LOADING_ELEMENT}
        mapElement={MAP_ELEMENT}
        containerElement={CONTAINER_ELEMENT}
        // selectedMarker={selectedMarker}
        // onClick={onClick}
        markers={this.props.markers}
        markerElements={this.state.markerElements}
      ></MapWithMarker>
    );
  }
}

const MapWithMarker = compose(
  withScriptjs,
  withGoogleMap
)(({ markers, markerElements }) => {
  return (
    <GoogleMap
      defaultZoom={getDefaultZoom(markers)}
      defaultCenter={getDefaultCenter(markers)}
    >
      {markerElements}
    </GoogleMap>
  );
});

/**
 * Deprecated scripts
 */
// const MapWithMarker = compose(
//   withScriptjs,
//   withGoogleMap
// )(({ markers, selectedMarker, onClick, showMarkers }) => {
//   return (
//     <GoogleMap
//       defaultZoom={getDefaultZoom(markers)}
//       defaultCenter={getDefaultCenter(markers)}
//     >
//       {markers.map((marker) => {
//         return (
//           <Marker
//             onClick={(event) => onClick(event, marker)}
//             position={{ lat: marker.lat, lng: marker.lng }}
//           >
//             {selectedMarker === marker && (
//               <InfoWindow>
//                 <div>{marker.city}</div>
//               </InfoWindow>
//             )}
//           </Marker>
//         );
//       })}
//     </GoogleMap>
//   );
// });

export default Map;
