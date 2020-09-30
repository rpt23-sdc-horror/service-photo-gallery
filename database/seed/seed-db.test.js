const mongoose = require("mongoose");
const seed = require("./seed-functions.js");
const Photo = require("../PhotoModel.js");

// Jest is a client-side JavaScript testing library developed by Facebook. Because Jest is designed primarily for testing React applications, using it to test Node.js server-side applications comes with a lot of caveats. We strongly advise against using Jest for testing any Node.js apps unless you are an expert developer with an intimate knowledge of Jest.
// If you choose to delve into dangerous waters and test Mongoose apps with Jest, here's what you need to know:
// >>> HUGO: so, I'm not sure how to use Jest here to use it with Mongoose

const databaseName = "fec-seed-photos-test";
// Mongoose connection instance
let db = null;

// describe("Seeding Photo DB:", () => {
  // creates database connection (each test file should have different database)
  beforeAll(async () => {
    await mongoose.connect(`mongodb://localhost:27017/${databaseName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    db = mongoose.connection;
  });

  // Cleans up database between each test
  afterEach(async () => {
    await Photo.deleteMany();
    console.log('afterEach ran');
  });

  // // drops database after all tests run
  afterAll(async () => {
    await db.dropDatabase();
    await db.close();
    console.log('afterAll ran');
  })

  test("should drop database before seed script runs", async () => {
    try {
      const emptyData = [];
      await seed.seedDatabase(db, emptyData);
      const photos = await Photo.find().lean();
      expect(photos.length).toBe(0);
    } catch (err) {
      console.log(err);
    }
  })
// })