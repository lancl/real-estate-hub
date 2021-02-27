/**
 * About: helper functions, for server side
 *
 * @function adjustAddress: replaces any space with '+', to meet axios's format; for
 * the first GET method
 *
 * @function adjustData: adjust DB's data (for front end); for the second GET method
 */

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

module.exports = {
  adjustAddress,
  adjustData,
};
