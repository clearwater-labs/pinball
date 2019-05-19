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
      .get("http://18.233.111.106:9000/machines")
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
        this.setState({ machines: data });
        this.state.machines.map(machine => {
          axios
            .get(`http://18.233.111.106:9000/machines/${machine._id}`)
            .then(res => {
              console.log(res);
              if (res) {
                return res.data;
              } else {
                throw new Error(
                  "Something went wrong. Fetch returned null value, check if API is down"
                );
              }
            })
            .then(data => {
              // convert the string into a number
              data.map(obj => {
                return (obj.score = Number(obj.score));
              });
              var name = machine.name;
              this.state.scores.push({ name, data });
              this.forceUpdate();
              console.log(this.state);
            });
          return true;
        });
      });
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
        {this.state.scores.map((scores, i) => (
          <div className="table-container" key={i}>
            <MUIDataTable
              title={scores.name}
              data={scores.data}
              columns={columns}
              options={options}
            />
          </div>
        ))}
      </div>
    );
  };

  render() {
    console.log(this.state.scores);
    return <div className="container">{this.renderTables()}</div>;
  }
}

export default Scoreboard;
