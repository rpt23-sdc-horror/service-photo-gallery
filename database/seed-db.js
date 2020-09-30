//establish Mongoose connection to "photos" database
const db = require("./index.js");
const Photo = require("./PhotoModel.js");
const ids = require("./seed-ids.js");

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
}

const seedDatabase = async () => {
  try {
    await resetDatabase();

    for (item of ids) {
      await seedDocument(item);
    }

    await db.close();
  } catch (err) {
    console.log(err);
  }
}

seedDatabase();