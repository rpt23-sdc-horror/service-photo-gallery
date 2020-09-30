//establish Mongoose connection to "photos" database
const db = require("../connect.js");
const Photo = require("../PhotoModel.js");
const data = require("./seed-data.js");

const resetDatabase = async () => {
  await db.dropDatabase();
  console.log("Photos database dropped");
}

const seedDocument = async ({product_id, style_id}) => {
  const photo = new Photo({
    product_id,
    style_id,
    main_photo: {
      thumbnail_url: `placeholder.com/photos/main_thumbnail/${product_id}-${style_id}.jpg`,
      regular_url: `placeholder.com/photos/main_regular/${product_id}-${style_id}.jpg`,
    },
  });

  await photo.save();
  console.log(`Document "${product_id}-${style_id}" saved!`)
}

const seedDatabase = async (data) => {
  try {
    await resetDatabase();

    for (item of data) {
      await seedDocument(item);
    }

    await db.close();
  }
  catch (err) {
    console.log(err);
  }
}

// Run this command to initialize seed script:
seedDatabase(data);

module.exports = {
  resetDatabase, seedDocument, seedDatabase
}