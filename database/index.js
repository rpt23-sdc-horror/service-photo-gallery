const Photo = require('./PhotoModel.js');

const getPhotosByProductId = async (productId) => {
  const results = await Photo.find({ product_id: productId },
    {
      product_id: 1, style_id: 1, main_photo: 1, _id: 0,
    })
    .lean();
  if (results.length === 0) {
    throw new Error(`no document found for productId ${productId}`);
  }
  return results;
};

const getPhotosByStyleId = async (productId, styleId) => {
  const result = await Photo.findOne({ product_id: productId, style_id: styleId }).lean();
  if (result === null) {
    throw new Error(`no document found for productId ${productId} and styleId ${styleId}`);
  }
  const photosResult = [result.main_photo.regular_url];
  result.other_photos.forEach((photo) => {
    photosResult.push(photo.regular_url);
  });
  return photosResult;
};

const addDocument = async (item) => {
  const photo = new Photo(item);

  await photo.save();
};

module.exports = {
  getPhotosByProductId, getPhotosByStyleId, addDocument,
};
