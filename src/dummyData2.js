// About: the default data, which is Seattle's

const { PARAMS, secondColor } = require("./chartParams");

module.exports = {
  labels: ["1996-01-31", "1996-02-29", "1996-03-31"],
  datasets: [
    {
      label: "Dummy City 1",
      data: ["245300", "269900", "280300"],
      ...PARAMS, // Color as blue
    },
    {
      label: "Dummy City 2",
      data: ["145300", "369900", "580300"],
      ...PARAMS,
      // Use orange as the color
      borderColor: secondColor,
    },
  ],
};
