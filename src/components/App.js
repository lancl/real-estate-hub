/**
 * About: main component for this app
 */

import "../App.css";
import React from "react";

// Import the components for this app
import Search from "./Search";
import Map from "./Map";
import LineChart from "./LineChart";

// [Todo] Define all of the states here
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: "", // Search query
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
  handleClick = () => {
    const city = this.state.city;
    this.searchByCity(city);
  };

  // About: search real-estate data, by input city
  // [Todo] Finish this method
  searchByCity = (city) => {
    alert("### Searching by city!");
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
          <LineChart />
          {/* <LineChart /> */}
        </div>
      </div>
    );
  }
}

export default App;
