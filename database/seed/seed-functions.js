const addDocument = require("../index.js").addDocument;

// The "database" is the Mongoose connection instance

const resetDatabase = async (database) => {
  await database.dropDatabase();
  console.log(`Dropped ${database.name}!`);
}

const seedDatabase = async (database, data) => {
  try {
    await resetDatabase(database);

    for (item of data) {
      await addDocument(item);
    }
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  resetDatabase, seedDatabase
}