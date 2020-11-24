/**
 * About: main component for this app
 * [TBD] Add a filter for year (via DB's 'date' field)
 */

import "../App.css";
import React from "react";
import axios from "axios";

// Import the components for this app
import Search from "./Search";
import Map from "./Map";
import LineChart from "./LineChart";

// Constant variable(s) for the search bar
// [Todo] Replace the dummy data below, by adding all of the US cities
const CITIES = ["San Jose, CA", "New York, NY"];

// Constant variables for the line chart
import DUMMY_DATA from "../dummyData2"; // eslint-disable-line
import { PARAMS, secondColor } from "../CHART_PARAMS"; // eslint-disable-line

// [Todo] Define the rest of the states (for Map component)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // [Todo] Change the state 'query' to an array
      query: "", // Search query
      suggestions: CITIES, // For search bar's auto suggest
      cityPriceData: DUMMY_DATA, // For 1 or more cities
    };
  }

  /**
   * Below are the methods
   */

  // About: helper for auto-suggest
  escapeRegexCharacters = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  // About: helper for auto-suggest
  getSuggestions = (value) => {
    const escapedValue = this.escapeRegexCharacters(value.trim());

    if (escapedValue === "") return [];

    const regex = new RegExp("^" + escapedValue, "i");

    return CITIES.filter((city) => regex.test(city));
  };

  // About: method for auto-suggest
  getSuggestionValue = (suggestion) => suggestion;

  // About: method for auto-suggest
  renderSuggestion = (suggestion) => <span>{suggestion}</span>;

  // About: handle text change in search box
  // Note: adjusted per auto suggestion
  handleChange = (_, { newValue }) => {
    this.setState({
      query: newValue,
    });
  };
  // handleChange = (e) => {
  //   this.setState({
  //     query: e.target.value,
  //   });
  // };

  // About: method for auto-suggest
  onSuggestionsFetchRequested = ({ value }) => {
    console.log(`### [onSuggestionsFetchRequested] value is ${value}`);
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // About: method for auto-suggest
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
    const city = this.state.query;
    this.getPriceByCity(city);
  };

  // About: search to get price data, by input city
  getPriceByCity = (city) => {
    axios
      .get(`/city/${city}`)
      .then((response) => {
        console.log(`### [Response Data] ${JSON.stringify(response)}`);
        const { labels, datasets } = response.data;

        // Update corresponding state, with PARAMS added
        this.setState({
          cityPriceData: {
            labels: labels,
            datasets: [
              {
                label: datasets[0].label,
                data: datasets[0].data,
                ...PARAMS,
              },
            ],
          },
        });
      })
      .catch((err) => {
        console.error(`### Error: ${err}`);
      });
  };

  render() {
    return (
      <div>
        <header className="App-header">Real Estate Hub</header>
        <Search
          query={this.state.query}
          suggestions={this.state.suggestions}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
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
