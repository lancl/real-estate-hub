/**
 * Key note(s):
 * (1) CSS for this component: height needs to be set in <Line/>; App.css does not work
 */

import React from "react";
import { Line } from "react-chartjs-2"; // This module depends on chart.js (the base module)

const CHART_TITLE = "Price Trend in Selected City (or Cities)";

// Helper function, for OPTIONs below
const ticksCb = (value) => {
  return "$" + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Currency label for vertical axis
const OPTIONS = {
  title: {
    display: true,
    text: CHART_TITLE,
  },
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
const HEIGHT = 100;

// About: the line-chart component
const LineChart = ({ data }) => (
  <div className="Line-Chart">
    <Line data={data} options={OPTIONS} height={HEIGHT} redraw />
  </div>
);

export default LineChart;
