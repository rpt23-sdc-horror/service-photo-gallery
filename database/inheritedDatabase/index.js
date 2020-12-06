const Photo = require('./PhotoModel.js');

const getPhotosByProductId = async (productId) => {
  const results = await Photo.find({ product_id: productId },
    {
      product_id: 1, style_id: 1, main_photo: 1, _id: 0,
    })
    .lean();

  return results;
};

const getPhotosByStyleId = async (productId, styleId) => {
  const result = await Photo.findOne({ product_id: productId, style_id: styleId }).lean();
  if (result === null) {
    return null;
  }
  const photosResult = [result.main_photo.regular_url];
  result.other_photos.forEach((photo) => {
    photosResult.push(photo.regular_url);
  });
  return photosResult;
};

const createPhoto = async (item) => {
  const photo = new Photo(item);

  await photo.save();
};

const updatePhoto = (targetDocument, updateValues) => new Promise((resolve, reject) => {
  Photo.findOneAndUpdate(targetDocument, updateValues, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

const deletePhoto = (productid) => new Promise((resolve, reject) => {
  Photo.deleteMany({ product_id: productid }, (err, result) => {
    if (err) reject(err);
    resolve(result);
  });
});

module.exports = {
  getPhotosByProductId,
  getPhotosByStyleId,
  createPhoto,
  updatePhoto,
  deletePhoto,
};
