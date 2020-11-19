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
      //
    };
  }

  /**
   * Below are the methods
   */

  render() {
    return (
      <div>
        <header className="App-header">Real Estate Hub</header>
        <Search />
        <div>
          <Map />
        </div>
        <div className="Charts">
          <LineChart />
          <LineChart />
        </div>
      </div>
    );
  }
}

export default App;
