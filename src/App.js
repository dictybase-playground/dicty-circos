import React, { Component } from "react";
import Circos from "circos";
import HighlightCircos from "./components/HighlightCircos";
import Circos2 from "./components/Circos2";
import HistogramCircos from "./components/HistogramCircos";
import { Container, Tab, Header, Icon } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Circos 1",
    render: () => (
      <Tab.Pane>
        <HistogramCircos />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Circos 2",
    render: () => (
      <Tab.Pane>
        <HighlightCircos />
      </Tab.Pane>
    )
  },
  { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
];

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

        <Tab panes={panes} />
      </Container>
    );
  }
}

export default App;
