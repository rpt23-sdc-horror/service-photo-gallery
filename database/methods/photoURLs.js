const { cluster } = require('../index');

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

module.exports = {
  getPhotosByStyleId,
  deletePhoto,
};
