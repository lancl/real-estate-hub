/**
 * About: process input data from Zillow (more of a CSV file, than an API)
 * Key steps
 * (1) Convert format from CSV to json
 * (2) Clean up the data: esp. create columns for 'Date' and 'Price'
 */

const csv = require("csvtojson");

// const filePath = "../zillow-data/test2.csv";
const filePath = "../zillow-data/zillowRegionData.csv";

// const FIRST_PART_HEADERS = ["ID", "Name"]; // For test file
const FIRST_PART_HEADERS = ["RegionID", "SizeRank", "RegionName", "StateName"];

// Note: each city (i.e. RegionName) has almost 300 rows' data (20+ years, on monthly basis)
const ROWS_TO_PRINT = 400; // For console.log

const processData = async (input) => {
  const output = [];

  // Step 1: convert input CSV into json
  const jsonArray = await csv().fromFile(filePath);

  // Step 2: re-shape the data, for each ID + Name (as in test2)
  for (let i = 0; i < jsonArray.length; i++) {
    const row = jsonArray[i]; // Data type as an object
    if (row["StateName"] === "") continue; // Skip row, if no state

    // Populate the first part (key-value pairs) for the obj
    const firstPartOfObj = {};
    FIRST_PART_HEADERS.forEach((header) => {
      firstPartOfObj[header] = row[header];
    });

    // Go through the row of objects (key-value pairs)
    for (const header in row) {
      if (header.length < 10) continue;
      if (header.substring(0, 6) === "Region") continue;

      // Add a new row/obj to the output, for each new date
      const obj = { ...firstPartOfObj };
      obj["Date"] = header;
      obj["Price"] = row[header];
      // Add the obj to the output
      output.push(obj);
    }
  }

  console.log(`### output: ${JSON.stringify(output.slice(0, ROWS_TO_PRINT))}`);
  return output;
};

processData(filePath);

// csv()
//   .fromFile(filePath)
//   .then((jsonObj) => {
//     console.log(jsonObj);
//   });
