import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";

/* Circos imports */
import HighlightCircos from "./components/HighlightCircos";
import HistogramCircos from "./components/HistogramCircos";
import LineCircos from "./components/LineCircos";

class App extends Component {
  render() {
    return (
      <Paper>
        <br />
        <br />
        <center>
          <h1>Dicty Access Circos Demos</h1>
        </center>
        <br />
        <br />
        <Paper>
          <LineCircos />
        </Paper>
        <Paper>
          <HistogramCircos />
        </Paper>
        <Paper>
          <HighlightCircos />
        </Paper>
      </Paper>
    );
  }
}

export default App;
