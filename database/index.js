// The 'database' is the Mongoose connection instance, it must be passed into the function

const Photo = require('./PhotoModel.js');

const getPhotosById = async (productId, styleId) => {
  const result = await Photo.findOne({ product_id: productId, style_id: styleId });
  if (result === null) {
    throw new Error(`no document found for productId ${productId} and styleId ${styleId}`);
  }
  return result;
};

const addDocument = async (item) => {
  const photo = new Photo({
    product_id: item.product_id,
    style_id: item.style_id,
    main_photo: {
      thumbnail_url: `placeholder.com/photos/main_thumbnail/${productId}-${styleId}.jpg`,
      regular_url: `placeholder.com/photos/main_regular/${productId}-${styleId}.jpg`,
    },
  });

  await photo.save();
  console.log(`Document '${productId}-${styleId}' saved!`);
};

module.exports = {
  getPhotosById, addDocument,
};
