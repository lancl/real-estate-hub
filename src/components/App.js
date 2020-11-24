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

// [Todo] Define the rest of the states (for Map component)
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "", // Search query
      priceOfCity1: DUMMY_DATA,
      priceOfCity2: DUMMY_DATA,
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
  getPriceByCity = (city, chartNum = 1) => {
    axios
      .get(`/city/${city}`)
      .then((response) => {
        console.log(`### [Response Data] ${JSON.stringify(response)}`);

        if (chartNum === 2) {
          this.setState({
            priceOfCity2: response.data,
          });
        } else {
          this.setState({
            priceOfCity1: response.data, // By default
          });
        }
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
          <LineChart data={this.state.priceOfCity1} />
          <LineChart data={this.state.priceOfCity2} />
        </div>
      </div>
    );
  }
}

export default App;
