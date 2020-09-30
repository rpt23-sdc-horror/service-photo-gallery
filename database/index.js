// The "database" is the Mongoose connection instance, it must be passed into the function

const Photo = require("./PhotoModel.js");

const getPhotosById = async (product_id, style_id) => {
  const result = await Photo.findOne({product_id, style_id});
  if (!result) {
    throw new Error(`no document found for product_id ${product_id} and style_id ${style_id}`);
  }
  return result;
}

const addDocument = async ({product_id, style_id}) => {
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

module.exports = {
  getPhotosById, addDocument
}

