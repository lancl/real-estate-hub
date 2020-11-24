/**
 * About: main component for this app
 */

import "../App.css";
import React from "react";
import axios from "axios";

// Import the components for this app
import Search from "./Search";
import Map from "./Map";
import LineChart from "./LineChart";

import DUMMY_DATA from "../dummyData2";
import { PARAMS } from "../CHART_PARAMS";

// [Todo] Define the rest of the states (for Map component)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // [Todo] Change the state 'query' to an array
      query: "", // Search query
      cityPriceData: DUMMY_DATA, // For 1 or more cities
    };
  }

  /**
   * Below are the methods
   */

  // About: handle text change in search box
  handleChange = (e) => {
    this.setState({
      query: e.target.value,
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
  // [Todo] Figure out a good way to set 'chartNum', by the second search bar
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
          handleChange={this.handleChange}
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
