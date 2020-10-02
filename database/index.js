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
  const photo = new Photo(item);

  await photo.save();
  console.log(`Document '${item.product_id}-${item.style_id}' saved!`);
};

module.exports = {
  getPhotosById, addDocument,
};
