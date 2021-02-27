/**
 * Ref to connect Express to create-react-app:
 * https://dev.to/loujaybee/using-create-react-app-with-express
 */

const express = require("express");
const path = require("path");
const app = express();
const db = require("../database-mongo/index"); // DB's controller

const PORT = 8000;

const { adjustAddress, adjustData } = require("./helpers");
const { getMapData } = require("../services/mapGeocode");

app.use(express.static(path.join(__dirname, "../build"))); // Refer to ref link above

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html")); // Refer to ref link above
});

/**
 * The HTTP/GET methods
 */

// About: first GET method, to get API data from Google Maps
app.get("/marker/:cityName/", async (req, res) => {
  const cityName = req.params.cityName;
  console.log(`[Server] Sending API request for marker of city ${cityName}`);
  //
  try {
    // Step: send request to service side, with parameter's format adjusted
    const response = await getMapData(adjustAddress(cityName));

    // Step: send the data to client side
    const { status, data } = response;
    //
    if (status !== 200) {
      console.error(`[Server] API call error, with status as ${status}`);
    } else {
      console.log(`[Server] Sending marker data back to the client side`);
      res.send(data);
    }
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// About: second GET method, to get price by city
app.get("/city/:name/", async (req, res) => {
  const city = req.params.name;
  // console.log(`### Searching for city ${city}`);
  try {
    // Step 1: get data from DB
    let data = await db.getPriceByCity(city);

    // Step 2: adjust data, per front end's format
    const adjustedData = adjustData(data, city);
    // console.log(`### [Adjusted Data] ${JSON.stringify(adjustedData)}`);

    // Step 3: send the data to client side
    // console.log(`###### Sending price data back to the client side`);
    res.send(adjustedData);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

//
app.listen(PORT, () => {
  console.log(`### [Server] Listenin to port ${PORT}`);
});
