import React, { Component } from "react";
import Circos from "circos";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import { cytobandsRaw } from "./data/cytobands";
import { GRCh37Raw } from "./data/GRCh37Raw";
import { snp250Raw } from "./data/snp250.js";
import { snpRaw } from "./data/snp.js";
import { snp1mRaw } from "./data/snp1m";

/* Saving values so they are not read-only */
var cytobands = cytobandsRaw;
var GRCh37 = GRCh37Raw;
var snp250 = snp250Raw;
var snp = snpRaw;
var snp1m = snp1mRaw;

const styles = {
  container: {
    paddingLeft: "20%",
    paddingRight: "20%"
  }
};

class ScatterCircos extends Component {
  constructor(props) {
    super(props);
    this.circosRef1 = React.createRef();
  }

  componentWillMount() {
    /* Helper functions for formatting raw data */
    GRCh37 = GRCh37.filter(function(d) {
      return d.id === "chr1" || d.id === "chr2" || d.id === "chr3";
    });

    cytobands = cytobands
      .filter(function(d) {
        return d.chrom === "chr1" || d.chrom === "chr2" || d.chrom === "chr3";
      })
      .map(function(d) {
        return {
          block_id: d.chrom,
          start: parseInt(d.chromStart),
          end: parseInt(d.chromEnd),
          gieStain: d.gieStain,
          name: d.name
        };
      });

    snp250 = snp250.map(function(d) {
      return {
        block_id: d.chromosome,
        position: (parseInt(d.start) + parseInt(d.end)) / 2,
        value: d.value
      };
    });

    snp = snp.map(function(d) {
      return {
        block_id: d.chromosome,
        position: (parseInt(d.start) + parseInt(d.end)) / 2,
        value: d.value
      };
    });

    snp1m = snp1m.map(function(d) {
      return {
        block_id: d.chromosome,
        position: (parseInt(d.start) + parseInt(d.end)) / 2,
        value: d.value
      };
    });
  }

  componentDidMount() {
    let myCircos = new Circos({
      container: this.circosRef1.current,
      width: 700,
      height: 700
    });

    myCircos.layout(GRCh37, {
      innerRadius: 700 / 2 - 150,
      outerRadius: 700 / 2 - 130,
      ticks: {
        display: false,
        spacing: 1000000,
        labelSuffix: ""
      },
      labels: {
        position: "center",
        display: true,
        size: 14,
        color: "#000",
        radialOffset: 80
      }
    });

    myCircos.scatter("snp-250", snp250, {
      innerRadius: 0.65,
      outerRadius: 0.95,
      color: function(d) {
        if (d.value > 0.006) {
          return "#011f4b";
        }
        if (d.value < 0.002) {
          return "#005b96";
        }
        return "#d3d3d3";
      },
      strokeColor: "#011f4b",
      strokeWidth: 0.5,
      shape: "circle",
      size: 20,
      min: 0,
      max: 0.013,
      axes: [
        {
          spacing: 0.001,
          start: 0.006,
          thickness: 1,
          color: "#8b9dc3",
          opacity: 0.3
        },
        {
          spacing: 0.002,
          start: 0.006,
          thickness: 1,
          color: "#8b9dc3",
          opacity: 0.5
        },
        {
          spacing: 0.002,
          start: 0.002,
          end: 0.006,
          thickness: 1,
          color: "#8b9dc3",
          opacity: 0.5
        },
        {
          spacing: 0.001,
          end: 0.002,
          thickness: 1,
          color: "#8b9dc3",
          opacity: 0.5
        }
      ],
      backgrounds: [
        {
          start: 0.006,
          color: "#8b9dc3",
          opacity: 0.1
        },
        {
          start: 0.002,
          end: 0.006,
          color: "#d3d3d3",
          opacity: 0.1
        },
        {
          end: 0.002,
          color: "#8b9dc3",
          opacity: 0.1
        }
      ],
      tooltipContent: function(d, i) {
        return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`;
      }
    });

    myCircos.scatter(
      "snp-250-2",
      snp250.filter(function(d) {
        return d.value > 0.007;
      }),
      {
        color: "#03396c",
        strokeColor: "#03396c",
        strokeWidth: 1,
        shape: "circle",
        size: 10,
        min: 0.007,
        max: 0.013,
        innerRadius: 1.075,
        outerRadius: 1.175,
        axes: [
          {
            spacing: 0.001,
            thickness: 1,
            color: "#4caf50",
            opacity: 0.3
          },
          {
            spacing: 0.002,
            thickness: 1,
            color: "#4caf50",
            opacity: 0.5
          }
        ],
        backgrounds: [
          {
            start: 0.007,
            color: "#3b5998",
            opacity: 0.1
          },
          {
            start: 0.009,
            color: "#3b5998",
            opacity: 0.1
          },
          {
            start: 0.011,
            color: "#3b5998",
            opacity: 0.1
          },
          {
            start: 0.013,
            color: "#3b5998",
            opacity: 0.1
          }
        ],
        tooltipContent: function(d, i) {
          return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`;
        }
      }
    );

    myCircos.scatter(
      "snp-250-3",
      snp250.filter(function(d) {
        return d.value < 0.002;
      }),
      {
        color: "#03396c",
        strokeColor: "#03396c",
        strokeWidth: 1,
        shape: "circle",
        size: 10,
        min: 0,
        max: 0.002,
        innerRadius: 0.35,
        outerRadius: 0.6,
        axes: [
          {
            spacing: 0.0001,
            thickness: 1,
            color: "#6497b1",
            opacity: 0.3
          },
          {
            spacing: 0.0005,
            thickness: 1,
            color: "#6497b1",
            opacity: 0.5
          }
        ],
        backgrounds: [
          {
            end: 0.0004,
            color: "#b3cde0",
            opacity: 0.1
          },
          {
            end: 0.0008,
            color: "#b3cde0",
            opacity: 0.1
          },
          {
            end: 0.0012,
            color: "#b3cde0",
            opacity: 0.1
          },
          {
            end: 0.0016,
            color: "#b3cde0",
            opacity: 0.1
          },
          {
            end: 0.002,
            color: "#b3cde0",
            opacity: 0.1
          }
        ],
        tooltipContent: function(d, i) {
          return `${d.block_id}:${Math.round(d.position)} ➤ ${d.value}`;
        }
      }
    );

    myCircos.render();
  }

  render() {
    return (
      <Paper>
        <center>
          <div className={this.props.classes.container}>
            <h1>Scatter Circos</h1>
            <p>A circos built with nested line scatter graphs</p>
          </div>

          <div ref={this.circosRef1} />
        </center>
      </Paper>
    );
  }
}

export default withStyles(styles)(ScatterCircos);
