import React, { Component } from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

class Scoreboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      machines: []
    };
  }

  componentDidMount = () => {
    axios
      .get("http://localhost:9000/machines")
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
        this.setState({ machines: data });
      });
    this.interval = setInterval(() => {
      axios
        .get("http://localhost:9000/scores")
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
    }, 500);
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  renderTables = () => {
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
      <div>
        {this.state.machines.map((machine, i) => (
          <div className="table-container">
            <MUIDataTable
              key={i}
              title={machine.name}
              data={this.state.data}
              columns={columns}
              options={options}
            />
          </div>
        ))}
      </div>
    );
  };

  render() {
    return <div className="container">{this.renderTables()}</div>;
  }
}

export default Scoreboard;
