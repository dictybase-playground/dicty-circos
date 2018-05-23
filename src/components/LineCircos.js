import React, { Component } from "react";
import Circos from "circos";
import * as d3 from "d3";
import { Container, Message } from "semantic-ui-react";

import { cytobands } from "./data/cytobands.js";
import { GRCh37 } from "./data/GRCh37.js";
import { snp250Raw } from "./data/snp250.js";
import { snpRaw } from "./data/snp.js";
import { snp1mRaw } from "./data/snp1m";

const data = [
  { len: 31, color: "#8dd3c7", label: "January", id: "january" },
  { len: 28, color: "#ffffb3", label: "February", id: "february" },
  { len: 31, color: "#bebada", label: "March", id: "march" },
  { len: 30, color: "#fb8072", label: "April", id: "april" },
  { len: 31, color: "#80b1d3", label: "May", id: "may" },
  { len: 30, color: "#fdb462", label: "June", id: "june" },
  { len: 31, color: "#b3de69", label: "July", id: "july" },
  { len: 31, color: "#fccde5", label: "August", id: "august" },
  { len: 30, color: "#d9d9d9", label: "September", id: "september" },
  { len: 31, color: "#bc80bd", label: "October", id: "october" },
  { len: 30, color: "#ccebc5", label: "November", id: "november" },
  { len: 31, color: "#ffed6f", label: "December", id: "december" }
];

/* Saving values so they are not read-only */
var snp250 = snp250Raw;
var snp = snpRaw;
var snp1m = snp1mRaw;
var GRCh37Filtered = GRCh37;

class HistogramCircos extends Component {
  constructor(props) {
    super(props);
    this.circosRef1 = React.createRef();
  }
  componentDidMount() {
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

    GRCh37Filtered = GRCh37Filtered.filter(function(d) {
      return d.id === "chr1" || d.id === "chr2" || d.id === "chr3";
    });

    let myCircos = new Circos({
      container: this.circosRef1.current,
      width: 800,
      height: 800
    });

    myCircos.layout(GRCh37Filtered, {
      innerRadius: 800 / 2 - 150,
      outerRadius: 800 / 2 - 120,
      labels: {
        display: true,
        radialOffset: -15
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
      color: "#222222",
      axes: [
        {
          spacing: 0.001,
          thickness: 1,
          color: "#666666"
        }
      ],
      backgrounds: [
        {
          start: 0,
          end: 0.002,
          color: "#f44336",
          opacity: 0.5
        },
        {
          start: 0.006,
          end: 0.015,
          color: "#4caf50",
          opacity: 0.5
        }
      ],
      tooltipContent: null
    });

    myCircos.scatter("snp-250-tooltip", snp250, {
      innerRadius: 0.5,
      outerRadius: 0.8,
      min: 0,
      max: 0.015,
      fill: false,
      strokeWidth: 0,
      tooltipContent: function(d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`;
      }
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
          color: "#f44336"
        },
        {
          position: 0.006,
          color: "#4caf50"
        }
      ],
      tooltipContent: null
    });

    myCircos.line("snp1m", snp1m, {
      innerRadius: 1.01,
      outerRadius: 1.15,
      maxGap: 1000000,
      min: 0,
      max: 0.015,
      color: "#f44336",
      tooltipContent: null
    });

    myCircos.line("snp-in", snp, {
      innerRadius: 0.85,
      outerRadius: 0.95,
      maxGap: 1000000,
      direction: "in",
      min: 0,
      max: 0.015,
      color: "#222222",
      axes: [
        {
          position: 0.01,
          color: "#4caf50"
        },
        {
          position: 0.008,
          color: "#4caf50"
        },
        {
          position: 0.006,
          color: "#4caf50"
        },
        {
          position: 0.002,
          color: "#f44336"
        }
      ],
      tooltipContent: null
    });

    myCircos.line("snp1m-in", snp1m, {
      innerRadius: 0.85,
      outerRadius: 0.95,
      maxGap: 1000000,
      direction: "in",
      min: 0,
      max: 0.015,
      color: "#f44336",
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
          <p>A circos built with nested line graphs.</p>
        </Message>
        <center>
          <div ref={this.circosRef1} />
        </center>
      </Container>
    );
  }
}

export default HistogramCircos;
