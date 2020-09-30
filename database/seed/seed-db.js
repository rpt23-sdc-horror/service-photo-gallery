const db = require("../connect.js");
const photoDB = require("../index.js");
const data = require("./seed-data.js");

photoDB.seedDatabase(db, data);