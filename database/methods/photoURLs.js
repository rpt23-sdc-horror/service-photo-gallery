const { cluster } = require('../index');
const { generatePhotoURL } = require('../documents/photoURL');
const { validateUpdateValue } = require('../../utils/validation');

const getPhotosByStyleId = async (product_id, style_id) => {
  const query = `
  SELECT * FROM photo_urls
  WHERE product_id=${product_id}
  AND style_id='${style_id}'
  `;

  try {
    const result = await cluster.query(query);
    const photoInfo = result.rows[0].photo_urls;
    return [photoInfo.main_photo.regular_url, ...photoInfo.other_photos];
  } catch (err) {
    throw new Error('Query failed: \n', err);
  }
};

const deletePhoto = async (product_id) => {
  const query = `
  DELETE FROM photo_urls
  WHERE product_id=${product_id}
  `;

  try {
    await cluster.query(query);
    console.log('Delete Query Succeeded');
  } catch (err) {
    throw new Error('Query failed: \n', err);
  }
};

const createPhoto = async (key, product) => {
  const newProduct = generatePhotoURL(product);

  const query = `
  INSERT INTO photo_urls (KEY, VALUE)
  VALUES ("${key}", ${JSON.stringify(newProduct)})
  `;

  try {
    await cluster.query(query);
    console.log('Create Query Succeeded');
  } catch (err) {
    throw new Error('Query failed: \n', err);
  }
};

const updatePhoto = async (targetDocument, updateValues) => {
  const targetKey = validateUpdateValue(updateValues);
  const targetValue = JSON.stringify(updateValues[targetKey]);

  const query = `
  UPDATE photo_urls
  SET ${targetKey} = ${targetValue}
  WHERE product_id=${targetDocument.product_id} AND style_id='${targetDocument.style_id}'
  `;

  try {
    await cluster.query(query);
    console.log('Update Query Succeeded');
  } catch (err) {
    throw new Error('Query failed: \n', err);
  }
};

module.exports = {
  getPhotosByStyleId,
  deletePhoto,
  createPhoto,
  updatePhoto,
};
