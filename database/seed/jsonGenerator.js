/* eslint-disable no-await-in-loop */
const path = require('path');
const { createFolder, writeFile, appendFile } = require('../../utils/fs');
const { rng } = require('../../utils/math');

require('dotenv').config();

const baseURL = process.env.AWS_BUCKET_BASE_URL;

const generateRecord = (productId, styleId, comma) => {
  const randomProductId = rng(1, 1000);

  return (`  {
    "product_id": ${productId},
    "style_id": "00${styleId}",
    "main_photo": {
      "thumbnail_url": "${baseURL}/products/id-${randomProductId}/style-${styleId}/main-thumbnail.jpg",
      "regular_url": "${baseURL}/products/id-${randomProductId}/style-${styleId}/main.jpg"
    },
    "other_photos": [
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-001.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-002.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-003.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-004.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-005.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-006.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-007.jpg",
      "${baseURL}/products/id-${randomProductId}/style-${styleId}/other-008.jpg"
    ]
  }${comma}
`);
};

const maxProducts = 335000;
const maxStyles = 3;
const throttle = 10000;

(async function generateJSONdata() {
  try {
    await createFolder(path.join(__dirname, 'data'));

    const fileName = 'photoRecords.json';
    const jsonPath = path.join(__dirname, 'data', fileName);

    await writeFile(jsonPath, '[\n');
    let throttleTracker = 1;
    let jsonData = '';

    for (let productId = 1; productId <= maxProducts; productId += 1) {
      for (let styleId = 1; styleId <= maxStyles; styleId += 1) {
        const comma = (productId === maxProducts && styleId === maxStyles) ? '' : ',';
        jsonData += generateRecord(productId, styleId, comma);
      }
      if (throttleTracker === throttle) {
        await appendFile(jsonPath, jsonData);
        jsonData = '';
        throttleTracker = 0;
        console.log(`Inserted product ${productId}`);
      }
      throttleTracker += 1;
    }
    await appendFile(jsonPath, jsonData);
    await appendFile(jsonPath, ']\n');
    console.log(`Created file ${fileName} which contains ${maxProducts} records`);
  } catch (err) {
    console.log(err.stack);
  }
}());
