import React, { Component } from "react";
import Circos from "circos";
import { GRCh37 } from "./data/GRCh37.js";
import { es } from "./data/es.js";
import { ips } from "./data/ips.js";
import * as d3 from "d3";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const styles = {
  container: {
    paddingLeft: "20%",
    paddingRight: "20%"
  }
};

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
        var start = parseInt(datum.start, 10);
        var end = parseInt(datum.end, 10);
        if (
          (start < position && end > position) ||
          (start > position && start < position + binLength)
        ) {
          counter++;
        }
      });
      raw2.forEach(function(datum) {
        var start = parseInt(datum.start, 10);
        var end = parseInt(datum.end, 10);
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

class HistogramCircos extends Component {
  constructor(props) {
    super(props);
    this.circosRef1 = React.createRef();
  }
  componentDidMount() {
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
      color: "PuBu"
    });
    myCircos.histogram("histogram4", buildData(es, ips, GRCh37), {
      innerRadius: 0.5,
      outerRadius: 0.75,
      color: "GnBu"
    });
    myCircos.histogram("histogram3", buildData(es, ips, GRCh37), {
      innerRadius: 0.4,
      outerRadius: 0.45,
      color: "Purples"
    });
    myCircos.render();
  }
  render() {
    return (
      <Paper>
        <center>
          <div className={this.props.classes.container}>
            <h1>Histogram Circos</h1>
            <p>
              A circos built with nested histograms. In this demo each histogram
              has been given the same data set (for the sake of convenience) but
              each histogram can express a unique set of data.
            </p>
            <div ref={this.circosRef1} />
          </div>
        </center>
      </Paper>
    );
  }
}

export default withStyles(styles)(HistogramCircos);
