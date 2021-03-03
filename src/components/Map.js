/**
 * About: map component of the app's, that uses react-google-maps module
 *
 * [TBD] Improve this component, with regard to README's description
 * Module's doc: https://tomchentw.github.io/react-google-maps/
 * How: consider switching this class back to a function
 *
 * Key note(s):
 * (1) CSS in JS: some styles are required to be defined at the parent component,
 * <Map>; whereas the styles do not seem to work via 'className' (i.e. App.css)
 * (2) HoC (higher-order component): via the module 'compose'; per sample/ref codes
 * (3) Map's API key: from .env file; note that use MAP_KEY_FAKE to avoid un-necessary
 * charge (e.g. when testing other features)
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

import { getDefaultZoom, getDefaultCenter } from "../helpers";

/**
 * The default parameters
 * Note: there is some bug with saving the params in a separate file (e.g.
 * mapParams.js); due to variable value as a HTML element
 */

const MAP_KEY = process.env.REACT_APP_MAP_KEY;
const MAP_URL = `https://maps.googleapis.com/maps/api/js?key=${MAP_KEY}&v=3.exp&libraries=geometry,drawing,places`;

const LOADING_ELEMENT = <div style={{ height: `90%` }} />;
const MAP_ELEMENT = <div style={{ height: `90%` }} />;
const CONTAINER_ELEMENT = <div style={{ height: `35vh` }} />; // For <GoogleMap/> container

/**
 * Components: parent and child
 */

// About: parent component
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markerElements: [], // Note: it is the HTML element(s), not just JS
    };
  }

  // After App.js changes 'markers'
  componentDidUpdate(prevProps) {
    const { markers } = this.props;

    if (markers !== prevProps.markers) {
      // alert(`[Map] componentDidUpdate, for prop markers!`);
      this.setState({
        markerElements: this.generateMarkerElements(markers),
      });
    }
  }

  // About: generate HTML elements, for input markers
  generateMarkerElements = (markers) => {
    const output = [];
    // console.log(`### [generateMarker] markers' length is ${markers.length}`);
    markers.map((marker, index) => {
      output.push(<Marker position={{ lat: marker.lat, lng: marker.lng }} />);
    });
    return output;
  };

  render() {
    return (
      <MapWithMarker
        googleMapURL={MAP_URL}
        //
        loadingElement={LOADING_ELEMENT}
        mapElement={MAP_ELEMENT}
        containerElement={CONTAINER_ELEMENT}
        markers={this.props.markers}
        markerElements={this.state.markerElements}
      ></MapWithMarker>
    );
  }
}

// About: child component
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
 * Deprecated scripts (from a ref link)
 */
// const MapWithMarker = compose(
//   withScriptjs,
//   withGoogleMap
// )(({ markers, selectedMarker, onClick }) => {
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
