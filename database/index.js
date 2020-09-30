require("./connect.js");

const Photo = require("PhotoModel.js");

const getPhotosByStyleId = async (product_id, style_id) => {
  const results = await Photo.find({product_id, style_id});
  return results;
}

module.exports = {
  getPhotosByStyleId
}

