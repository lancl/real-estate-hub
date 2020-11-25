/**
 * About: process input data from Zillow (more of a CSV file, than an API)
 *
 * Key steps:
 * (1) Convert format from CSV to json
 * (2) Clean up the data: esp. create columns for 'Date' and 'Price'
 *
 * The data table(s):
 * (1) Time-series: fields includ RegionName, Date, Price
 */

const csv = require("csvtojson");
// const filePath = "../zillow-data/test2.csv";
const filePath = "../zillow-data/zillowRegionData.csv";

/**
 * Define the constant variables
 */

const TIME_SERIES_HEADERS = ["RegionName", "date", "price"];
const HEADERS_MAPPING = {
  RegionName: "city",
};

/**
 * The data-processing function(s)
 */

const generateTimeSeriesData = async (input) => {
  const output = [];

  // Step 1: convert input CSV into json
  const jsonArray = await csv().fromFile(filePath);

  // Step 2: re-shape the data, for each ID + Name (as in test2)
  for (let i = 0; i < jsonArray.length; i++) {
    const row = jsonArray[i]; // Data type as an object
    if (row["StateName"] === "") continue; // Skip row, if no state

    // Populate the first part (key-value pairs) for the obj
    const firstPartOfObj = {};
    const firstHeader = TIME_SERIES_HEADERS[0];
    const firstHeaderMapped = HEADERS_MAPPING[TIME_SERIES_HEADERS[0]];
    firstPartOfObj[firstHeaderMapped] = row[firstHeader];

    // Go through the row of objects (key-value pairs)
    for (const header in row) {
      if (header.length < 10) continue;
      if (header.substring(0, 6) === "Region") continue;

      // Add a new row/obj to the output, for each new date
      const obj = { ...firstPartOfObj };

      obj[TIME_SERIES_HEADERS[1]] = header;
      obj[TIME_SERIES_HEADERS[2]] = row[header];
      // Add the obj to the output
      output.push(obj);
    }
  }

  // console.log(`### output: ${JSON.stringify(output.slice(0, ROWS_TO_PRINT))}`);
  return output;
};

// About: generate a list of cities (for UI's auto-suggestion)
// Note: export the data to cityList.js (instead of saving it to DB), because the data
// is relatively small
const generateCityList = async (input) => {
  const output = [];

  const jsonArray = await csv().fromFile(filePath);

  for (let i = 0; i < jsonArray.length; i++) {
    const row = jsonArray[i];
    output.push(row.RegionName);
  }

  console.log(JSON.stringify(output));

  return output;
};

// generateCityList(filePath); // Note: only need to run this line one-time

module.exports = {
  generateTimeSeriesData,
  filePath,
};

/**
 * Simple test(s)
 */

// Check if step 1 is working
// csv()
//   .fromFile(filePath)
//   .then((json) => {
//     console.log(json);
//   });

// Test step 2
// Note: each city (i.e. RegionName) has almost 300 rows' data (20+ years, on monthly basis)
// const ROWS_TO_PRINT = 20; // For console.log
// generateTimeSeriesData(filePath);
