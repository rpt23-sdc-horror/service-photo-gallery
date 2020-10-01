const { addDocument } = require('../index.js');

// The 'database' is the Mongoose connection instance

const resetDatabase = async (database) => {
  await database.dropDatabase();
  console.log(`Dropped ${database.name}!`);
};

const seedDatabase = async (database, data) => {
  try {
    await resetDatabase(database);
    /* eslint-disable */
    for (const item of data) {
      await addDocument(item);
    }
    /* eslint-enable */
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  seedDatabase,
};
