const axios = require("axios");
const faker = require("faker");
const moment = require("moment");

const count = 10;

async function populate() {
  var created = 0;
  while (created < count) {
    axios.post("http://localhost:9000/scores", {
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      score: Math.round(Math.random() * (100000000 - 100000) + 100000),
      company: faker.company.companyName(),
      machine: "Terminator 3"
    });
    created += 1;
  }
}

console.log("Starting 🚀");
const start = moment();
populate()
  .then(() => {
    const end = moment();
    console.log(`All done in ${end.diff(start) / 1000} s 😸`);
  })
  .catch(err => {
    console.error(err);
    console.error("Failed 😭");
  });
