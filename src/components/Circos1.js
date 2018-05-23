import React, { Component } from "react";
import Circos from "circos";
import { electricalData } from "./data/electricalConsumption";
import { cytobands } from "./data/cytobands.js";
import { GRCh37 } from "./data/GRCh37.js";

class Circos1 extends Component {
  constructor(props) {
    super(props);
    this.circosRef1 = React.createRef();
  }
  componentDidMount() {
    const gieStainColor = {
      gpos100: "rgb(0,0,0)",
      gpos: "rgb(0,0,0)",
      gpos75: "rgb(130,130,130)",
      gpos66: "rgb(160,160,160)",
      gpos50: "rgb(200,200,200)",
      gpos33: "rgb(210,210,210)",
      gpos25: "rgb(200,200,200)",
      gvar: "rgb(220,220,220)",
      gneg: "rgb(255,255,255)",
      acen: "rgb(217,47,39)",
      stalk: "rgb(100,127,164)",
      select: "rgb(135,177,255)"
    };

    console.log("GRCh37 data: ", GRCh37);
    console.log("Cytoband data: ", cytobands);

    let myCircos = new Circos({
      container: this.circosRef1.current,
      width: 800,
      height: 800
    });
    myCircos.layout(GRCh37, {
      innerRadius: 800 / 2 - 80,
      outerRadius: 800 / 2 - 40,
      labels: {
        radialOffset: 70
      },
      ticks: {
        display: true,
        labelDenominator: 1000000
      },
      events: {
        "click.demo": function(d, i, nodes, event) {
          console.log("clicked on layout block", d, event);
        }
      }
    });
    myCircos.highlight("cytobands", cytobands, {
      innerRadius: 800 / 2 - 80,
      outerRadius: 800 / 2 - 40,
      opacity: 0.3,
      color: function(x) {
        return gieStainColor[x.gieStain];
      },
      tooltipContent: function(x) {
        return "Name: " + x.name;
      }
    });
    myCircos.render();
  }
  render() {
    return (
      <div>
        <div ref={this.circosRef1} />
      </div>
    );
  }
}

export default Circos1;
