/**
 * Key note(s):
 * (1) CSS for this component: height needs to be set in <Line/>; App.css does not work
 */

import React from "react";

import { Line } from "react-chartjs-2"; // This module depends on chart.js (the base module)

// Currency label for vertical axis
const OPTIONS = {
  scales: {
    yAxes: [
      {
        ticks: {
          callback: function (value, index, values) {
            return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          },
        },
      },
    ],
  },
};
// CSS: height for the chart
const HEIGHT = 150;

// About: the line-chart component
const LineChart = ({ data }) => (
  <div className="Line-Chart">
    <p>City #</p>
    <Line data={data} options={OPTIONS} height={HEIGHT} redraw />
  </div>
);

export default LineChart;
