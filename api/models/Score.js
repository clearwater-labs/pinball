let mongoose = require("mongoose");

//Subscriber Schema
let scoreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  score: {
    type: String,
    required: true
  },
  machine: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: false
  },
  time: {
    type: Date,
    default: Date.now
  }
});

let Score = (module.exports = mongoose.model("Score", scoreSchema));
