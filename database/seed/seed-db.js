//establish Mongoose connection to "photos" database
const db = require("../start.js");
const Photo = require("../PhotoModel.js");
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
  console.log(`Document "${product_id}-${style_id}" saved!`)
}

const seedDatabase = async (ids) => {
  try {
    await resetDatabase();

    for (item of ids) {
      await seedDocument(item);
    }

  } catch (err) {
    console.log(err);
  }
}

const init = async () => {
  try {
    await seedDatabase(ids);
    await db.close();
  }
  catch (err) {
    console.log(err);
  }
}

init();

module.exports = {
  seedDocument, seedDatabase
}