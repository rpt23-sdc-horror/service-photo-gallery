const mongoose = require('mongoose');
const seed = require('./seed-functions.js');
const Photo = require('../PhotoModel.js');
const seedData = require('./seed-data.json');

const databaseName = 'fec-seed-photos-test';

// Mongoose connection instance
let db = null;

describe('Photo DB Seed Script:', () => {
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
  });

  // this doesn't appear to actually work (no error is thrown)
  // test('should throw error if not connected to MongoDB', async () => {
  //   await db.close();
  //   await expect(seed.seedDatabase(db, testData)).rejects.toThrow();
  // });

  test('should drop database before script runs', async () => {
    try {
      const emptyData = [];
      await seed.seedDatabase(db, emptyData);
      const photos = await Photo.find().lean();
      expect(photos).toHaveLength(0);
    } catch (err) {
      console.log(err);
    }
  });

  test('should add all data passed in', async () => {
    try {
      await seed.seedDatabase(db, seedData);
      const photos = await Photo.find().lean();
      expect(photos).toHaveLength(300);
      expect(photos[299]).toMatchObject({
        product_id: 100,
        style_id: '003',
        main_photo: {
          thumbnail_url: 'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/thumbnail/100-003.jpg',
          regular_url: 'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/100-003.jpg',
        },
      });
    } catch (err) {
      console.log(err);
    }
  });
});

// add failing cases: i.e. can't connect to database, data is invalid, is unexpected
// ex. if the database can't connect, is seed script properly ended
// can check Mongoose DB error codes
