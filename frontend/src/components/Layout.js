import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class Layout extends Component {
  render() {
    const classes = this.props;
    return (
      <div className="app root">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Pinball Scoreboard
            </Typography>
            <Button href="/" color="inherit">
              Home
            </Button>
            <Button href="/submit" color="inherit">
              Submit Score
            </Button>
            <Button href="/machineAdmin" color="inherit">
              Manage Machines
            </Button>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Layout);
