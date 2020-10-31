const db = require('../connect.js');
const seed = require('./seed-functions.js');
const data = require('./seed-data.json');

(async () => {
  try {
    await seed.seedDatabase(db, data);
    console.log('Database seeded with photo urls!');
    await db.close();
    console.log(`Connection to ${db.name} DB closed!`);
  } catch (err) {
    console.log(err);
    await db.close();
    console.log(`Connection to ${db.name} DB closed!`);
  }
})();
