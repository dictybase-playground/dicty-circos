import React, { Component } from "react";
import Circos from "circos";
import * as d3 from "d3";
import { Container, Message } from "semantic-ui-react";

import { cytobands } from "./data/cytobands.js";
import { snp250Raw } from "./data/snp250.js";
import { snpRaw } from "./data/snp.js";
import { snp1mRaw } from "./data/snp1m";

/* Saving values so they are not read-only */
var snp250 = snp250Raw;
var snp = snpRaw;
var snp1m = snp1mRaw;

const GRCh371 = [
  { id: "chr1", label: "chr1", color: "#2a4d69", len: 249250621 },
  { id: "chr2", label: "chr2", color: "#4b86b4", len: 243199373 },
  { id: "chr3", label: "chr3", color: "#adcbe3", len: 198022430 }
];

class LineCircos extends Component {
  constructor(props) {
    super(props);
    this.circosRef1 = React.createRef();
  }
  componentWillMount() {
    /* Helper functions for formatting raw data */
    snp250 = snp250.map(function(x) {
      return {
        block_id: x.chromosome,
        position: (parseInt(x.start) + parseInt(x.end)) / 2,
        value: x.value
      };
    });

    snp = snp.map(function(x) {
      return {
        block_id: x.chromosome,
        position: (parseInt(x.start) + parseInt(x.end)) / 2,
        value: x.value
      };
    });

    snp1m = snp1m.map(function(x) {
      return {
        block_id: x.chromosome,
        position: (parseInt(x.start) + parseInt(x.end)) / 2,
        value: x.value
      };
    });
  }
  componentDidMount() {
    let myCircos = new Circos({
      container: this.circosRef1.current,
      width: 800,
      height: 800
    });

    myCircos.layout(GRCh371, {
      innerRadius: 250,
      outerRadius: 260,
      labels: {
        display: true,
        radialOffset: 60
      },
      ticks: {
        display: false
      }
    });

    myCircos.line("snp-250", snp250, {
      innerRadius: 0.5,
      outerRadius: 0.8,
      maxGap: 1000000,
      min: 0,
      max: 0.015,
      color: "#2a4d69",
      axes: [
        {
          spacing: 0.02,
          thickness: 1,
          color: "#666666"
        }
      ],
      backgrounds: [
        {
          start: 0,
          end: 0.002,
          color: "#4b86b4",
          opacity: 0.5
        },
        {
          start: 0.006,
          end: 0.015,
          color: "#e7eff6",
          opacity: 0.5
        }
      ],
      tooltipContent: null
    });

    myCircos.line("snp", snp, {
      innerRadius: 1.01,
      outerRadius: 1.15,
      maxGap: 1000000,
      min: 0,
      max: 0.015,
      color: "#222222",
      axes: [
        {
          position: 0.002,
          color: "#4b86b4"
        }
      ],
      tooltipContent: null
    });

    myCircos.line("snp-in", snp, {
      innerRadius: 0.75,
      outerRadius: 0.95,
      maxGap: 10000000,
      direction: "out",
      min: 0,
      max: 0.015,
      color: "#222222",
      axes: [
        {
          position: 0.002,
          color: "#4b86b4"
        },
        {
          position: 0.0001,
          color: "#4b86b4"
        }
      ],
      tooltipContent: null
    });

    myCircos.line("snp1m-in", snp1m, {
      innerRadius: 0.75,
      outerRadius: 0.95,
      maxGap: 1000000,
      direction: "out",
      min: 0,
      max: 0.015,
      color: "#fe2e2e",
      tooltipContent: null
    });

    myCircos.render();
  }

  render() {
    return (
      <Container>
        <Message info>
          <center>
            <Message.Header>Line Circos</Message.Header>
          </center>
          <p>
            A circos built with nested line circos graphs. Two different line
            graphs can overlap each other (as shown in the circos below, where
            the red line is on top of the black line)
          </p>
        </Message>
        <center>
          <div ref={this.circosRef1} />
        </center>
      </Container>
    );
  }
}

export default LineCircos;
