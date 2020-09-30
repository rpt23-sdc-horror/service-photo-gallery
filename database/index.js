require("./connect.js");

const Photo = require("./PhotoModel.js");

const getPhotosById = async (product_id, style_id) => {
  console.log(style_id);
  const result = await Photo.findOne({product_id, style_id});
  return result;
}

module.exports = {
  getPhotosById
}

