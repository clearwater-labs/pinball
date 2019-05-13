import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import NumberFormat from "react-number-format";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submitSuccess: false,
      numberformat: "",
      machine: ""
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    axios
      .post("http://192.168.86.51:9000/scores", {
        name: this.state.name,
        company: this.state.company,
        score: this.state.numberformat,
        machine: this.state.machine
      })
      .then(res => {
        if (res.status === 200) {
          console.log("yeets");
          this.setState({ submitSuccess: true });
          window.location.replace("/");
        } else {
          console.log(res.status);
        }
      });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value
            }
          });
        }}
        thousandSeparator
      />
    );
  }

  render() {
    var today = new Date();
    var date = `${today.getMonth() +
      1}/${today.getDate()}/${today.getFullYear()}`;
    const { numberformat } = this.state;
    return (
      <div>
        <Paper className="form-container">
          <Typography variant="h5" component="h3">
            Pinball Score Submission
          </Typography>
          {this.state.submitSuccess ? (
            <Typography variant="h5" component="h3">
              Success
            </Typography>
          ) : (
            <form onSubmit={this.handleSubmit} autoComplete="off">
              <TextField
                id="standard-with-placeholder"
                autoComplete="name"
                label="Name"
                required={true}
                autoFocus={true}
                fullWidth={true}
                placeholder="First Last"
                margin="normal"
                onChange={this.handleChange("name")}
              />
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
                  <MenuItem value="Terminator 3">Terminator 3</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Score"
                required={true}
                fullWidth={true}
                placeholder="Score"
                value={numberformat}
                onChange={this.handleChange("numberformat")}
                id="formatted-numberformat-input"
                InputProps={{
                  inputComponent: this.NumberFormatCustom
                }}
                margin="normal"
              />
              <TextField
                id="standard-with-placeholder"
                label="Company"
                autoComplete="organization"
                fullWidth={true}
                margin="normal"
                onChange={this.handleChange("company")}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </form>
          )}
        </Paper>
      </div>
    );
  }
}

export default Form;
