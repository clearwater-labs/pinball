import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Scoreboard from "./components/Scoreboard";
import Layout from "./components/Layout";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Scoreboard} />
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
