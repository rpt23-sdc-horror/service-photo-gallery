const { cluster } = require('../index');
const { generatePhotoURL } = require('../documents/photoURL');
const { validateUpdateValue } = require('../../utils/validation');
require('dotenv').config();

const bucketName = process.env.CB_BUCKET;

const getPhotosByStyleId = async (product_id, style_id) => {
  try {
    const result = await cluster.query(`
    SELECT * FROM ${bucketName}
    WHERE product_id=${product_id}
    AND style_id='${style_id}'
  `);

    return result.rows;
  } catch (err) {
    throw new Error('Select Query failed: \n', err);
  }
};

const deletePhoto = async (product_id) => {
  const query = `
    DELETE FROM ${bucketName}
    WHERE product_id=${product_id}
  `;

  try {
    await cluster.query(query);
    console.log('Delete Query Succeeded');
  } catch (err) {
    throw new Error('Delete Query failed: \n', err);
  }
};

const createPhoto = async (key, product) => {
  const newProduct = generatePhotoURL(product);

  const query = `
    INSERT INTO ${bucketName} (KEY, VALUE)
    VALUES ("${key}", ${JSON.stringify(newProduct)})
  `;

  try {
    await cluster.query(query);
    console.log('Create Query Succeeded');
  } catch (err) {
    throw new Error('Create Query failed: \n', err);
  }
};

const updatePhoto = async (targetDocument, updateValue) => {
  const targetKey = validateUpdateValue(updateValue);
  const targetValue = JSON.stringify(updateValue[targetKey]);

  const query = `
    UPDATE ${bucketName}
    SET ${targetKey} = ${targetValue}
    WHERE product_id=${targetDocument.product_id} AND style_id='${targetDocument.style_id}'
  `;

  try {
    await cluster.query(query);
    console.log('Update Query Succeeded');
  } catch (err) {
    throw new Error('Update Query failed: \n', err);
  }
};

module.exports = {
  getPhotosByStyleId,
  deletePhoto,
  createPhoto,
  updatePhoto,
};
