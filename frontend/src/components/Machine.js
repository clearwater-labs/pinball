import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machines: [],
      scores: []
    };
  }

  componentDidMount = () => {
    axios
      .get("http://18.233.111.106:9000/machines/" + this.props.match.params.id)
      .then(res => {
        if (res) {
          return res.data;
        } else {
          throw new Error(
            "Something went wrong. Fetch returned null value, check if API is down"
          );
        }
      })
      .then(data => {
        this.setState({ scores: data });
      });
  };

  render() {
    const columns = [
      {
        name: "name",
        label: "Name"
      },
      {
        name: "score",
        label: "Score",
        options: {
          //   customBodyRender: (value, tableMeta, updateValue) => {
          //     return (
          //       <p>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
          //     );
          //   }
          sortDirection: "desc"
        }
      },
      {
        name: "company",
        label: "Company"
      },
      {
        name: "time",
        label: "Date"
      }
    ];

    const options = {
      filter: true,
      selectableRows: "none",
      viewColumns: false,
      rowsPerPageOptions: [10, 25, 50, 100, 150],
      responsive: "scroll"
    };
    return (
      <div className="container">
        <MUIDataTable
          title="Machine High Score"
          data={this.state.scores}
          columns={columns}
          options={options}
        />
      </div>
    );
  }
}

export default Scoreboard;
