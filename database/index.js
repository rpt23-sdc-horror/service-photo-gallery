require("./connect.js");

const Photo = require("./PhotoModel.js");

const getPhotosById = async (product_id, style_id) => {
  const result = await Photo.findOne({product_id, style_id});
  if (!result) {
    throw new Error('no document found for this ID');
  }
  return result;
}

module.exports = {
  getPhotosById
}

