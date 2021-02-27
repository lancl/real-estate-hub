/**
 * About: API call to Google Maps, to get marker data
 */

const axios = require("axios");

// For the map
// Note: this other Google service is also no longer free
const { MAP_KEY } = require("../config");

const GEOCODE_URL = `https://maps.googleapis.com/maps/api/geocode/json?key=${MAP_KEY}`;

const getMapData = (adjustedCityName) => {
  return axios.get(`${GEOCODE_URL}&address=${adjustedCityName}`);
};

module.exports = {
  getMapData,
};
