import React, { Component } from "react";
import Circos from "circos";
import Circos1 from "./components/Circos1";
import Circos2 from "./components/Circos2";
import { Container, Tab, Header, Icon } from "semantic-ui-react";

const panes = [
  {
    menuItem: "Circos 1",
    render: () => (
      <Tab.Pane>
        <Circos1 />
      </Tab.Pane>
    )
  },
  {
    menuItem: "Circos 2",
    render: () => (
      <Tab.Pane>
        <Circos2 />
      </Tab.Pane>
    )
  },
  { menuItem: "Tab 3", render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> }
];

class App extends Component {
  render() {
    return (
      <Container>
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
