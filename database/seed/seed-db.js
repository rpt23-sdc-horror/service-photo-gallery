const db = require("../connect.js");
const seed = require("./seed-functions.js");
const data = require("./seed-data.js");

seed.seedDatabase(db, data);