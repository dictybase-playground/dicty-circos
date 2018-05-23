import React, { Component } from "react";
import Circos from "circos";
import { cytobands } from "./data/cytobands.js";
import { GRCh37 } from "./data/GRCh37.js";
import { es } from "./data/es.js";
import { ips } from "./data/ips.js";
import * as d3 from "d3";
import { Container, Message } from "semantic-ui-react";

/*
* buildData
* Helper function that formats data for the histograms
*/
function buildData(rawData1, rawData2, karyotype) {
  var binLength = 10000000;
  var data = [];
  var rawDataByChr1 = d3
    .nest()
    .key(function(d) {
      return d.chr;
    })
    .entries(rawData1);
  var rawDataByChr2 = d3
    .nest()
    .key(function(d) {
      return d.chr;
    })
    .entries(rawData2);
  karyotype.forEach(function(chr) {
    var raw1 = rawDataByChr1.filter(function(d) {
      return d.key === chr.id;
    })[0].values;
    var raw2 = rawDataByChr2.filter(function(d) {
      return d.key === chr.id;
    })[0].values;
    d3.range(0, chr.len, binLength).forEach(function(position) {
      var counter = 0;
      raw1.forEach(function(datum) {
        var start = parseInt(datum.start);
        var end = parseInt(datum.end);
        if (
          (start < position && end > position) ||
          (start > position && start < position + binLength)
        ) {
          counter++;
        }
      });
      raw2.forEach(function(datum) {
        var start = parseInt(datum.start);
        var end = parseInt(datum.end);
        if (
          (start < position && end > position) ||
          (start > position && start < position + binLength)
        ) {
          counter++;
        }
      });
      data.push({
        block_id: chr.id,
        start: position,
        end: Math.min(position + binLength - 1, chr.len),
        value: counter
      });
    });
  });
  return data;
}

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

class HistogramCircos extends Component {
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

    let myCircos = new Circos({
      container: this.circosRef1.current,
      width: 800,
      height: 800
    });
    myCircos.layout(GRCh37, {
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
    myCircos.histogram("histogram1", buildData(es, ips, GRCh37), {
      innerRadius: 1.01,
      outerRadius: 1.3,
      color: "Blues"
    });
    myCircos.histogram("histogram2", buildData(es, ips, GRCh37), {
      innerRadius: 0.65,
      outerRadius: 1.0,
      color: "Greens"
    });
    myCircos.histogram("histogram4", buildData(es, ips, GRCh37), {
      innerRadius: 0.5,
      outerRadius: 0.75,
      color: "Purples"
    });
    myCircos.histogram("histogram3", buildData(es, ips, GRCh37), {
      innerRadius: 0.4,
      outerRadius: 0.45,
      color: "Reds"
    });
    myCircos.render();
  }
  render() {
    return (
      <Container>
        <Message info>
          <center>
            <Message.Header>Histogram Circos</Message.Header>
          </center>
          <p>
            A circos built with several layers of histograms. In this demo each
            histogram has been given the same data set (for the sake of
            convenience) but each histogram can express a unique set of data.
          </p>
        </Message>
        <center>
          <div ref={this.circosRef1} />
        </center>
      </Container>
    );
  }
}

export default HistogramCircos;
