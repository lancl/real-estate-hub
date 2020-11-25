/**
 * About: main component for this app
 * [TBD] Add lifescycle method(s)
 */

import "../App.css";
import React from "react";
import axios from "axios";

// Import the components for this app
import SearchFilters from "./SearchFilters";
import Map from "./Map";
import LineChart from "./LineChart";

/**
 * Constant variables
 */

// Constant variable(s) for the search bar
import { CITIES } from "../cityList";

// Constant variables for the line chart
import DUMMY_DATA from "../dummyData2"; // eslint-disable-line
import { PARAMS, secondColor } from "../chartParams"; // eslint-disable-line

/**
 * Helper functions: the first 2 are for auto-suggestion
 * Ref link: https://www.npmjs.com/package/react-autosuggest
 * @function escapeRegexCharacters: regex processing
 * @function getSuggestions: to get a list of suggestion(s)
 *
 * @function getStateWithMergedData: helper for @function getPriceByCity
 */

const escapeRegexCharacters = (str) =>
  str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const getSuggestions = (value) => {
  const escapedValue = escapeRegexCharacters(value.trim());
  //
  if (escapedValue === "") return [];
  //
  const regex = new RegExp("^" + escapedValue, "i");
  return CITIES.filter((city) => regex.test(city));
};

// Approach as 2 pointers (p1 and p2); output as a new state
const getStateWithMergedData = (l1, labels1, data1, l2, labels2, data2) => {
  const newState = {
    labels: [],
    datasets: [
      {
        label: l1,
        data: [],
        ...PARAMS,
      },
      {
        label: l2,
        data: [],
        ...PARAMS,
        // Adjust the color
        backgroundColor: secondColor,
        borderColor: secondColor,
        pointBorderColor: secondColor,
      },
    ],
  };

  // Step 1: go through input arrays (labels and data), to update the newState
  const labels = newState.labels;
  const data1merged = newState.datasets[0].data;
  const data2merged = newState.datasets[1].data;
  let p1 = 0,
    p2 = 0;
  let len1 = labels1.length,
    len2 = labels2.length;

  while (p1 < len1 && p2 < len2) {
    if (labels1[p1] < labels2[p2]) {
      labels.push(labels1[p1]);
      data1merged.push(data1[p1]);
      p1++;
      data2merged.push("");
    } else if (labels1[p1] > labels2[p2]) {
      labels.push(labels2[p2]);
      data2merged.push(data2[p2]);
      p2++;
      data1merged.push("");
    } else {
      labels.push(labels1[p1]);
      data1merged.push(data1[p1]);
      data2merged.push(data2[p2]);
      p1++;
      p2++;
    }
  }

  // Step 2: check for any remaining number
  if (p1 < len1) {
    while (p1 < len1) {
      labels.push(labels1[p1]);
      data1merged.push(data1[p1]);
      p1++;
      data2merged.push("");
    }
  } else {
    while (p2 < len2) {
      labels.push(labels2[p2]);
      data2merged.push(data2[p2]);
      p2++;
      data1merged.push("");
    }
  }

  return newState;
};

/**
 * App Component (as a class)
 */

// [Todo] Define the rest of the states (for Map component)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city1: "",
      city2: "",
      suggestions: CITIES, // For search bar's auto suggest
      cityPriceData: DUMMY_DATA, // For 1 or more cities
    };
  }

  /**
   * Below are the methods
   */

  // About: handle text change in search box
  // Note: adjusted per auto suggestion
  // handleChange = (e) => { this.setState({ query: e.target.value }) }
  handleChange = (event, newValue, id) => {
    // console.log(`### [handleChange] id is ${id}, newValue is ${newValue}`);

    if (id === 1) {
      this.setState({ city1: newValue });
    } else {
      this.setState({ city2: newValue });
    }
  };

  // About: method for auto-suggestion
  onSuggestionsFetchRequested = ({ value }) => {
    // console.log(`### [onSuggestionsFetchRequested] value is ${value}`);
    this.setState({
      suggestions: getSuggestions(value),
    });
  };

  // About: method for auto-suggestion
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // About:; handle click on search button
  // Note: need 'e.preventDefault()', to prevent the browser from reloading;
  // otherwise, response/data will not com back to client side
  handleClick = (e) => {
    e.preventDefault();
    //
    const { city1, city2 } = this.state;

    // Check for exception (i.e. no city1 was filled)
    if (city1.length === 0) {
      alert(`Please fill out the first city (a required field)!`);
      return;
    }

    this.getPriceByCity(city1, city2);
  };

  // About: search to get price data, by input city
  getPriceByCity = async (city1, city2) => {
    try {
      // For city 1
      console.log(`[getPrice] Pulling data for city 1`);
      const { data } = await axios.get(`/city/${city1}`);
      const labels1 = data.labels;
      const datasets1 = data.datasets;
      console.log(`### [getPrice] labels1's length: ${labels1.length}`);

      // For city 1 only
      if (city2.length === 0) {
        this.setState({
          cityPriceData: {
            labels: labels1,
            datasets: [
              {
                label: datasets1[0].label,
                data: datasets1[0].data,
                ...PARAMS,
              },
            ],
          },
        });
      }
      // For city 2 as well (optional)
      else {
        const response = await axios.get(`/city/${city2}`);
        const labels2 = response.data.labels;
        const datasets2 = response.data.datasets;
        console.log(`### [getPrice] labels2's length: ${labels2.length}`);

        // Merge the data
        const newState = getStateWithMergedData(
          datasets1[0].label,
          labels1,
          datasets1[0].data,
          datasets2[0].label,
          labels2,
          datasets2[0].data
        );

        // Update the state
        this.setState({
          cityPriceData: newState,
        });
      }
    } catch (err) {
      console.error(`### Error: ${err}`);
    }
  };

  render() {
    return (
      <div>
        <header className="App-header">Real Estate Hub</header>
        <SearchFilters
          city1={this.state.city1}
          city2={this.state.city2}
          suggestions={this.state.suggestions}
          handleChange={this.handleChange}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          handleClick={this.handleClick}
        />
        <div>
          <Map />
        </div>
        <div className="Charts">
          <LineChart data={this.state.cityPriceData} />
        </div>
      </div>
    );
  }
}

export default App;
