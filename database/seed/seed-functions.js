const addDocument = require("../index.js").addDocument;

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

    await database.close();
    console.log(`Connection to ${database.name} DB closed!`);
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = {
  resetDatabase, seedDatabase
}