// require all the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
var cors = require("cors");
var Scores = require("./models/Score");
var Machine = require("./models/Machine");

// import environment variables from .env file
require("dotenv").config();

// create an instance of express
const app = express();
var port = process.env.PORT || 9000;

// connect to the database
console.log("Trying to connect to " + process.env.DB_HOST);
setTimeout(() => {
  mongoose
    .connect("mongodb://" + process.env.DB_HOST, {
      user: process.env.DB_USER,
      pass: process.env.DB_PASS,
      useNewUrlParser: true
    })
    .then(() => {
      console.log("Connected to database");
    })
    .catch(err => {
      console.log(
        "This error could be because of a missing .env file. Make sure you have created your own:"
      );
      console.error(err);
    });
}, 1000);

app.use(cors());

// request logging
app.use(morgan("tiny"));

// configure app to use bodyParser
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

app.get("/machines", (req, res) => {
  Machine.find({}, (err, machines) => {
    if (err) {
      res.send("error");
      return;
    }
    res.status(200).json({ data: machines });
  });
});

app.post("/machines", (req, res) => {
  // check to see if the request has a name of the machine
  if (!req.body.name) {
    res.status(400).send();
    return;
  }

  var newMachine = new Machine({ name: req.body.name });

  newMachine.save(err => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).json(newMachine);
  });
});

app.delete("/machines", (req, res) => {
  // check to see if the request has a name of the machine
  console.log(req.body);
  if (!req.body.name) {
    res.status(400).send();
    console.log("No name supplied");
    return;
  }

  Machine.deleteOne({ name: req.body.name }, err => {
    if (err) {
      res.send(400).send();
      return;
    }
    res.status(202).send();
  });
});

app.post("/machines", (req, res) => {
  // check to see if the request has a name of the machine
  if (!req.body.name) {
    res.status(400).send();
    return;
  }

  var newMachine = new Machine({ name: req.body.name });

  newMachine.save(err => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    console.log(newMachine);
    res.status(201).json(newMachine);
  });
});

app.get("/machines/:machineId", (req, res) => {
  console.log(req.params);
  if (!req.params.machineId) {
    res.status(400).send();
    return;
  }

  Machine.findById(req.params.machineId, (err, machine) => {
    Scores.find({ machine: machine.name }, (errors, scores) => {
      res.status(200).json(scores);
    });
  });
});

app.get("/scores", (req, res) => {
  Scores.find({}, (err, scores) => {
    if (err) {
      console.log(err);
    }
    res.status(200).json({ data: scores });
  });
});

app.post("/scores", (req, res) => {
  if (!req.body.name || !req.body.score || !req.body.machine) {
    console.log(req.body);
    res.status(400);
    res.json({
      success: false
    });
    return;
  }
  var newData = {};
  if (req.body.company) {
    newData = {
      name: req.body.name,
      score: req.body.score,
      machine: req.body.machine,
      company: req.body.company
    };
  } else {
    newData = {
      name: req.body.name,
      score: req.body.score,
      machine: req.body.machine
    };
  }
  console.log(newData);

  var newScore = new Scores(newData);

  newScore.save(err => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        message: "Failed to save score"
      });
    }
    res.status(200).json({
      message: "score saved"
    });
  });
});

/***** ERROR PAGES *****/
app.use((req, res) => {
  res.status(404);
  res.json({
    status: "failed",
    message: "This resource does not exist"
  });
});

app.use((error, req, res, next) => {
  res.status(500);
  console.log(error);
  res.json({
    status: "failed",
    message: "Server error"
  });
});

app.listen(port, () => {
  console.log("API listening on port ", port);
});
