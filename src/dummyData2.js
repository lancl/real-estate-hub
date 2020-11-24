// About: the default data, which is Seattle's

const { PARAMS } = require("./CHART_PARAMS");

module.exports = {
  labels: ["1996-01-31", "1996-02-29", "1996-03-31"],
  datasets: [
    {
      label: "City is Seattle",
      data: ["245300", "269900", "280300"],
      ...PARAMS,
    },
    {
      label: "Second City (for Test)",
      data: ["145300", "369900", "580300"],
      ...PARAMS,
    },
  ],
};
