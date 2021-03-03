/**
 * About: main component for this app
 */

import "../App.css";
import React from "react";
import axios from "axios";

// Import the components for this app
import SearchFilters from "./SearchFilters";
import Map from "./Map";
import LineChart from "./LineChart";

// Helper functions
import {
  getSuggestions,
  getStateWithMergedData,
  updateMarker,
} from "../helpers";

/**
 * Constant variables
 */

// For the search bar
import { CITIES } from "../cityList";

// For the line chart
import DUMMY_DATA from "../dummyData2"; // eslint-disable-line
import { PARAMS } from "../chartParams"; // eslint-disable-line

/**
 * App Component (as a class)
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      city1: "",
      city2: "",
      suggestions: [], // For search bar's auto suggest
      cityPriceData: {}, // For 1 or more cities
      markers: [], // For Map component; up to 2
    };
  }

  // Note: load the data only after component did mount
  componentDidMount() {
    this.setState({
      suggestions: CITIES,
    });
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

    this.updateMap(city1, city2);
    this.getPriceByCity(city1, city2);
  };

  // About: update Map component per city names
  // [TBD] Error checking for response.status, in 'try'
  updateMap = async (city1, city2) => {
    const marker1 = { city: city1 };
    const marker2 = { city: city2 };

    try {
      // Get the lat and lng
      // For city1
      const response1 = await axios.get(`/marker/${city1}`);
      updateMarker(marker1, response1.data, "city 1");

      // For city2 (optional)
      if (city2.length > 0) {
        const response2 = await axios.get(`/marker/${city2}`);
        updateMarker(marker2, response2.data, "city 2");
      }

      // Update the corresponding state
      this.setState({
        markers:
          Object.keys(marker2).length > 1 ? [marker1, marker2] : [marker1],
        // showMarkers: true,
      });
    } catch (err) {
      console.error(`### Error: ${err}`);
    }
  };

  // About: search to get price data, by input city
  // [TBD] Extract the overlapping parts between the 2 cities, to a helper
  getPriceByCity = async (city1, city2) => {
    try {
      // For city 1
      console.log(`[getPrice] Pulling data for city 1`);
      const { data } = await axios.get(`/city/${city1}`);
      const labels1 = data.labels;
      const datasets1 = data.datasets;
      // console.log(`### [getPrice] labels1's length: ${labels1.length}`);

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
        // console.log(`### [getPrice] labels2's length: ${labels2.length}`);

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
        <div className="Map">
          <Map markers={this.state.markers} />
        </div>
        <div className="Charts">
          <LineChart data={this.state.cityPriceData} />
        </div>
      </div>
    );
  }
}

export default App;
