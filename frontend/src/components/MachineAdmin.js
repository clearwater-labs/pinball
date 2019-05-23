import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import axios from "axios";
import QRCode from "qrcode.react";
var id = 0;

class MachineAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      machine: "",
      action: "add",
      newMachineName: "",
      success: false,
      newMachineId: null
    };
  }

  createData(name, calories, fat, carbs, protein) {
    id += 1;
    return { id, name, calories, fat, carbs, protein };
  }

  componentDidMount = () => {
    axios.get("http://18.233.111.106:9000/machines").then(res => {
      console.log(res.data.data);
      this.setState({ data: res.data.data });
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      newMachineId: null
    });
    console.log(this.state);
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);

    if (this.state.action === "add") {
      // check if the machine name is blank
      if (this.state.newMachineName.length === 0) {
        console.log("No new Machine name");
        return;
      }
      axios
        .post("http://18.233.111.106:9000/machines", {
          name: this.state.newMachineName
        })
        .then(res => {
          console.log(res);
          this.setState({ newMachineId: res.data._id });
        });
    } else {
      axios
        .delete("http://18.233.111.106:9000/machines", {
          data: {
            hello: "world",
            name: this.state.machine
          }
        })
        .then(res => {
          console.log(res);
          window.location.replace("/");
        });
    }
  };

  renderMachineList = () => {
    return (
      <FormControl required fullWidth margin="normal">
        <InputLabel htmlFor="machine-simple">Machine</InputLabel>
        <Select
          fullWidth
          value={this.state.machine}
          onChange={this.handleChange("machine")}
          inputProps={{
            name: "machine",
            id: "machine-simple"
          }}
        >
          {this.state.data.map((machine, i) => (
            <MenuItem key={i} value={machine.name}>
              {machine.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  render() {
    return (
      <div>
        <Paper className="machine-table">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Active Machines</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.data.map((machine, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {machine.name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        <Paper className="form-container">
          <Typography variant="h4">Add/Remove a Machine</Typography>
          <Typography variant="subtitle1" gutterBottom>
            Note: Removing a machine will not remove the scores for that
            machine. This is so that it can be added later without losing
            historical scores.
          </Typography>
          {this.state.newMachineId ? (
            <div>
              <h3>
                Machine Added! Follow this code to the machine scoreboard:
              </h3>
              <QRCode
                value={`http://cs268.s3-website-us-east-1.amazonaws.com/machine/${
                  this.state.newMachineId
                }`}
              />
            </div>
          ) : (
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Add/Remove"
                  name="gender1"
                  value={this.state.action}
                  onChange={this.handleChange("action")}
                >
                  <FormControlLabel
                    value="add"
                    control={<Radio color="primary" />}
                    label="Add"
                  />
                  <FormControlLabel
                    value="remove"
                    control={<Radio color="primary" />}
                    label="Remove"
                  />
                </RadioGroup>
              </FormControl>
              {this.state.action === "add" ? (
                <TextField
                  id="standard-with-placeholder"
                  label="New Machine Name"
                  value={this.state.newMachineName}
                  required={true}
                  autoFocus={true}
                  fullWidth={true}
                  margin="normal"
                  onChange={this.handleChange("newMachineName")}
                />
              ) : (
                <div>{this.renderMachineList()}</div>
              )}

              <Button type="submit" variant="contained" color="primary">
                {this.state.action} Machine
              </Button>
            </form>
          )}
        </Paper>
      </div>
    );
  }
}

export default MachineAdmin;
