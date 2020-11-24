/**
 * Ref to connect Express to create-react-app:
 * https://dev.to/loujaybee/using-create-react-app-with-express
 */

const express = require("express");
const path = require("path");
const app = express();
const db = require("../database-mongo/index"); // DB's controller

const PORT = 8000;

app.use(express.static(path.join(__dirname, "../build"))); // Refer to ref link above

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../build", "index.html")); // Refer to ref link above
});

// About: GET method (of the server's)
app.get("/city/:name/", async (req, res) => {
  const city = req.params.name;
  console.log(`### Searching for city ${city}`);

  try {
    // Step 1: get data from DB
    let data = await db.getPriceByCity(city);
    // data = data.slice(0, 6);

    // Step 2: adjust data, per front end's format
    const adjustedData = adjustData(data, city);
    // console.log(`### [Adjusted Data] ${JSON.stringify(adjustedData)}`);

    // Step 3: send the data to client side
    res.send(adjustedData);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

// About: helper function, to adjust DB's data (for front end)
const adjustData = (data, city) => {
  const output = {
    labels: [],
    datasets: [{ data: [] }],
  };

  // Update the label with city
  output.datasets[0].label = `City is ${city}`;

  // Add the data points  to output: lables (i.e. dates) and data (i.e. prices)
  data.forEach((point) => {
    // console.log(`###### point: ${JSON.stringify(point)}`);
    const { date, price } = point;

    // Simplify the date to month
    const month = date.getFullYear() + "-" + date.getMonth();
    output.labels.push(month);
    output.datasets[0].data.push(price);
  });

  return output;
};

app.listen(PORT, () => {
  console.log(`### [Server] Listenin to port ${PORT}`);
});
