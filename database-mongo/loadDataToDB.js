/**
 * About: load data from json object(s) to DB table(s)
 */

const { generateTimeSeriesData, filePath } = require("./processData.js");
const db = require("./index.js");

const loadDataToDB = async () => {
  // Step 1: generate time-series data (in json)
  let timeSeriesJson;
  try {
    timeSeriesJson = await generateTimeSeriesData(filePath);
    console.log(`### [Step 1] Generated data.`);
  } catch (e) {
    console.error(`### [Step 1]: error with generating data!`);
  }

  // Step 2: load the json data to the DB table
  try {
    await db.TimeSeries.insertMany(timeSeriesJson);
    console.log(`### [Step 2] Loaded data to MongoDB.`);
  } catch (e) {
    console.error(`### [Step 2]: error with loading data to MongoDB!`);
  }
};

// Note: only need to run this function one-time
loadDataToDB();
