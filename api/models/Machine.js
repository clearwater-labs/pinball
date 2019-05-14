let mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");

//Subscriber Schema
let machineSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  time: {
    type: Date,
    default: Date.now
  }
});

machineSchema.plugin(uniqueValidator);
let Machine = (module.exports = mongoose.model("Machine", machineSchema));
