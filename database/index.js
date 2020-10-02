// The 'database' is the Mongoose connection instance, it must be passed into the function

const Photo = require('./PhotoModel.js');

const getPhotosByProductId = async (productId) => {
  const results = await Photo.find({ product_id: productId },
    {
      product_id: 1, style_id: 1, main_photo: 1, _id: 0,
    })
    .lean();
  if (results === null) {
    throw new Error(`no document found for productId ${productId}`);
  }
  return results;
};

const getPhotosByStyleId = async (productId, styleId) => {
  const result = await Photo.findOne({ product_id: productId, style_id: styleId }).lean();
  if (result === null) {
    throw new Error(`no document found for productId ${productId} and styleId ${styleId}`);
  }
  return result;
};

const addDocument = async (item) => {
  const photo = new Photo(item);

  await photo.save();
  // console.log(`Document '${item.product_id}-${item.style_id}' saved!`);
};

module.exports = {
  getPhotosByProductId, getPhotosByStyleId, addDocument,
};
