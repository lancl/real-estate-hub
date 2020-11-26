/**
 * Helper functions: for App.js
 *
 * The first 2 are for auto-suggestion
 * Ref link: https://www.npmjs.com/package/react-autosuggest
 * @function escapeRegexCharacters: regex processing
 * @function getSuggestions: to get a list of suggestion(s)
 *
 * The 2 functions below are for @method updateMap
 * @function adjustAddress: replaces any space with '+', to meet axios's format
 * @function updateMarker: update a marker with 'lat' and 'lng'
 *
 * @function getStateWithMergedData: helper for @method getPriceByCity
 * Note: this function has less impact here, because the raw data from Zillow is structured
 * in SQL format; whereas it is more helpful for raw data in NoSQL (e.g. 2 cities have different
 * # of rows of data)
 */

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

const adjustAddress = (city) => {
  let output = "";
  for (let i = 0; i < city.length; i++) {
    const char = city[i];
    if (char === " ") {
      output = output + "+";
    } else {
      output = output + char;
    }
  }
  return output;
};

const updateMarker = (marker, response, city) => {
  const { status, data } = response;
  console.log(`### [updateMap] status is ${status}`);
  if (status !== 200) {
    console.error(`[updateMap] Error with ${city}, status as ${status}`);
    return;
  }
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

module.exports = {
  getSuggestions,
  adjustAddress,
  updateMarker,
  getStateWithMergedData,
};
