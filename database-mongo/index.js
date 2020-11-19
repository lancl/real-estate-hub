/**
 * About: DB connection; DB methods
 *
 * MongoDB (NoSQL): structured as: C (collections) and D (docs)
 * (1) Collections (AKA tables); equivalent to json data's array (as in test2.json)
 * (2) Each collection has documents; equivalent to each object in test2.json. Note that with
 * NoSQL, the docs do Not need to have the same schema.
 *
 * Examples of C and D: TimeSeries is a C; timeSeriesSchema is for this C's Ds
 */

const mongoose = require("mongoose");

/**
 * Part 1: DB connection
 */

const options = {
  useNewUrlParser: true,
  socketTimeoutMS: 30000,
  keepAlive: true,
  reconnectTries: 30000,
};

mongoose.connect("mongodb://localhost/real-estate", options);

const db = mongoose.connection;

db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => {
  console.log("Connected to Mongoose!");
});

/**
 * Part 2: schema of document (D)'s
 */
const timeSeriesSchema = new mongoose.Schema({
  city: String,
  date: Date,
  price: Number,
});

// Use mongoose to model the Collection (TimeSeries) with its docs' schema
const TimeSeries = mongoose.model("TimeSeries", timeSeriesSchema);

/**
 * Part 3: DB method(s)
 */

const getPriceByCity = (city) => TimeSeries.find({ city: city });

module.exports = {
  TimeSeries, // For the use by loadDataToDB.js
  getPriceByCity,
};
