const mongoose = require("mongoose");
const seed = require("./seed-functions.js");
const Photo = require("../PhotoModel.js");

const databaseName = "fec-seed-photos-test";

// Mongoose connection instance
let db = null;

const testData = [
  {
    product_id: "XX1111",
    style_id: "001"
  },
  {
    product_id: "XX1111",
    style_id: "002"
  },
  {
    product_id: "XX1111",
    style_id: "003"
  },
  {
    product_id: "AA2222",
    style_id: "001"
  },
  {
    product_id: "AA2222",
    style_id: "002"
  },
  {
    product_id: "BB3333",
    style_id: "001"
  },
]

describe("Photo DB Seed Script:", () => {
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
  });

  // // drops database after all tests run
  afterAll(async () => {
    await db.dropDatabase();
    await db.close();
  })

  test("should drop database before script runs", async () => {
    try {
      const emptyData = [];
      await seed.seedDatabase(db, emptyData);
      const photos = await Photo.find().lean();
      expect(photos.length).toBe(0);
    } catch (err) {
      console.log(err);
    }
  })

  test("should add all data passed in", async () => {
    try {
      await seed.seedDatabase(db, testData);
      const photos = await Photo.find().lean();
      expect(photos.length).toBe(6);
      expects(photos[3].product_id).toBe("AA2222");
    } catch (err) {
      console.log(err);
    }
  })
})

// add failing cases: i.e. can't connect to database, data is invalid, is unexpected
// ex. if the database can't connect, is seed script properly ended
// can check Mongoose DB error codes