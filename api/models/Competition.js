let mongoose = require("mongoose");

//Competition Schema
let compeitionSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  prize: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

let Competition = (module.exports = mongoose.model(
  "Competition",
  competitionSchema
));
