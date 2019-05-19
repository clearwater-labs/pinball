import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Layout from "./components/Layout";
import Form from "./components/Form";
import MachineAdmin from "./components/MachineAdmin";
import ErrorPage from "./components/ErrorPage";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Scoreboard} />
        <Route path="/submit" exact component={Form} />
        <Route path="/machineAdmin" exact component={MachineAdmin} />
        <Route component={ErrorPage} />
      </Switch>
    );
  }
}

class App extends Component {
  render() {
    return (
      <Layout>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Layout>
    );
  }
}

export default App;
