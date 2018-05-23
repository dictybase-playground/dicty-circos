import React, { Component } from "react";
import { Container, Header, Icon } from "semantic-ui-react";

/* Circos imports */
import HighlightCircos from "./components/HighlightCircos";
import HistogramCircos from "./components/HistogramCircos";
import LineCircos from "./components/LineCircos";

class App extends Component {
  render() {
    return (
      <Container>
        <br />
        <br />
        <center>
          <Header as="h2" icon>
            <Icon name="info circle" />
            Dicty Access Circos Demos
            <Header.Subheader>
              Several different circos diagrams made using Circos.js
            </Header.Subheader>
          </Header>
        </center>
        <br />
        <br />
        <Container>
          <LineCircos />
        </Container>
        <Container>
          <HistogramCircos />
        </Container>
        <Container>
          <HighlightCircos />
        </Container>
      </Container>
    );
  }
}

export default App;
