import React, { Component } from "react";
import MUIDataTable from "mui-datatables";

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const columns = [
      "Rank",
      "Name",
      {
        name: "Score",
        options: {
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <p>{value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</p>
            );
          }
        }
      },
      "Company",
      "Date"
    ];

    const data = [
      [1, "Brandon Pessman", 57000000, "Clearwater Labs", "5/1/19"],
      [2, "Alex Stout", 51000000, "Clearwater Labs", "5/2/19"],
      [3, "Taylor Misch", 44000000, "Clearwater Labs", "5/6/19"]
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
            data={data}
            columns={columns}
            options={options}
          />
        </div>
      </div>
    );
  }
}

export default Scoreboard;
