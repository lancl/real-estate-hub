/**
 * Key note(s):
 * (1) CSS for this component: height needs to be set in <Line/>; App.css does not work
 */

import React from "react";
import { Line } from "react-chartjs-2"; // This module depends on chart.js (the base module)

const CHART_TITLE = "Price Trend in US Cities";
const TITLE_TIP_1 = ": select first city to render chart";
const TITLE_TIP_2 = ": select second city to compare trends";

// Helper function, for renderTitle
const renderTitle = (data) => {
  if (!data.datasets || data.datasets.length === 0) {
    return CHART_TITLE + TITLE_TIP_1;
  }
  // Case: there is only city 1
  else if (data.datasets.length === 1) {
    return CHART_TITLE + TITLE_TIP_2;
  }
  // Case: data is for both cities
  else {
    return CHART_TITLE;
  }
};

// Helper function, for OPTIONs below
const ticksCb = (value) => {
  return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Currency label for vertical axis
const OPTIONS = {
  scales: {
    yAxes: [
      {
        ticks: {
          callback: ticksCb,
        },
      },
    ],
  },
};

// CSS: height for the chart
const HEIGHT = "65vh";

// About: the line-chart component
const LineChart = ({ data }) => (
  <div className="Line-Chart">
    <p>{renderTitle(data)}</p>
    <Line data={data} options={OPTIONS} height={HEIGHT} redraw />
  </div>
);

export default LineChart;
