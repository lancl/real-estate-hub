/**
 * About: helper functions: for client side
 */

/**
 * For App.js - auto-suggestion:
 * Ref link: https://www.npmjs.com/package/react-autosuggest
 * @function escapeRegexCharacters: regex processing
 * @function getSuggestions: to get a list of suggestion(s)
 *
 * For App.js - others:
 * @function updateMarker: update a marker with 'lat' and 'lng'
 * @function getStateWithMergedData: helper for @method getPriceByCity
 * Note: this function has less impact here, because the raw data from Zillow is structured
 * in SQL format; whereas it is more helpful for raw data in NoSQL (e.g. 2 cities have different
 * # of rows of data)
 */

const updateMarker = (marker, data, city) => {
  const { lat, lng } = data.results[0].geometry.location;
  marker.lat = lat;
  marker.lng = lng;
  return;
};

// Approach as 2 pointers (p1 and p2); output as a new state
const getStateWithMergedData = (l1, labels1, data1, l2, labels2, data2) => {
  const newState = {
    labels: [],
    datasets: [
      {
        label: l1,
        data: [],
        ...PARAMS,
      },
      {
        label: l2,
        data: [],
        ...PARAMS,
        // Adjust the color
        backgroundColor: secondColor,
        borderColor: secondColor,
        pointBorderColor: secondColor,
      },
    ],
  };

  // Step 1: go through input arrays (labels and data), to update the newState
  const labels = newState.labels;
  const data1merged = newState.datasets[0].data;
  const data2merged = newState.datasets[1].data;
  let p1 = 0,
    p2 = 0;
  let len1 = labels1.length,
    len2 = labels2.length;

  while (p1 < len1 && p2 < len2) {
    if (labels1[p1] < labels2[p2]) {
      labels.push(labels1[p1]);
      data1merged.push(data1[p1]);
      p1++;
      data2merged.push("");
    } else if (labels1[p1] > labels2[p2]) {
      labels.push(labels2[p2]);
      data2merged.push(data2[p2]);
      p2++;
      data1merged.push("");
    } else {
      labels.push(labels1[p1]);
      data1merged.push(data1[p1]);
      data2merged.push(data2[p2]);
      p1++;
      p2++;
    }
  }

  // Step 2: check for any remaining number
  if (p1 < len1) {
    while (p1 < len1) {
      labels.push(labels1[p1]);
      data1merged.push(data1[p1]);
      p1++;
      data2merged.push("");
    }
  } else {
    while (p2 < len2) {
      labels.push(labels2[p2]);
      data2merged.push(data2[p2]);
      p2++;
      data1merged.push("");
    }
  }

  return newState;
};

/**
 * For Map.js:
 * @function getDefaultZoom
 * @function getDefaultCenter
 */

const ZOOMS = {
  default: 3.5,
  big: 8,
};
const MARKERS = [
  { lat: 39.83, lng: -98.58, city: "Center of US" },
  { lat: 45.51, lng: -122.68, city: "Portland, OR" }, // Portland
];

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

const { PARAMS, secondColor } = require("./chartParams"); // eslint-disable-line
const { CITIES } = require("./cityList");

const escapeRegexCharacters = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  //
  if (escapedValue === "") return [];
  //
  const regex = new RegExp("^" + escapedValue, "i");
  return CITIES.filter((city) => regex.test(city));
};

export {
  getSuggestions,
  updateMarker,
  getStateWithMergedData,
  //
  getDefaultZoom,
  getDefaultCenter,
};
