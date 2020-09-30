const db = require("../connect.js");
const seed = require("./seed-functions.js");
const data = require("./seed-data.js");

(async () => {
  try {
    await seed.seedDatabase(db, data);
    await db.close();
    console.log(`Connection to ${db.name} DB closed!`);
  } catch (err) {
    console.log(err);
  }
})()


