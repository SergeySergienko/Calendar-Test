import React, { Component, Fragment } from "react";
import "./App.css";
import Events from "./components/Events";
import Grid from "./components/grid";

class App extends Component {
  render() {
    return (
      <Fragment>
        <Grid />
        <Events />
      </Fragment>
    );
  }
}

export default App;
