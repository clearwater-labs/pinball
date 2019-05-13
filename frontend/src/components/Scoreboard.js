import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount = () => {
    axios
      .get("http://192.168.86.51:9000/scores")
      .then(res => {
        if (res) {
          return res.data.data;
        } else {
          throw new Error(
            "Something went wrong. Fetch returned null value, check if API is down"
          );
        }
      })
      .then(data => {
        console.log(data);
        data.map(obj => {
          obj.score = Number(obj.score);
        });
        this.setState({ data });
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
      rowsPerPage: 10,
      rowsPerPageOptions: [10, 25, 50, 100, 150],
      responsive: "scroll"
    };
    return (
      <div className="container">
        <div className="table-container">
          <MUIDataTable
            title={"Terminator 3"}
            data={this.state.data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default Scoreboard;
