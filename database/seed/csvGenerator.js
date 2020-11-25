/* eslint-disable no-await-in-loop */
const path = require('path');
const { createFolder, writeFile, appendFile } = require('../../utils/fs');
const { rng } = require('../../utils/math');

require('dotenv').config();

const baseURL = process.env.AWS_BUCKET_BASE_URL;

const generateColumns = () => (
  'product_id,style_id,photo_url,photo_type,photo_size\n'
);

const generateLine = (productId, styleId, photoURL, photoType, photoSize) => (
  `${productId},00${styleId},${photoURL},${photoType},${photoSize}\n`
);

const generateRecord = (productId, styleId) => {
  const randomProductId = rng(1, 1000);

  const thumbnailUrl = `${baseURL}/products/id-${randomProductId}/style-${styleId}/main-thumbnail.jpg`;
  const regularUrl = `${baseURL}/products/id-${randomProductId}/style-${styleId}/main.jpg`;
  const otherPhotos = [
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-001.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-002.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-003.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-004.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-005.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-006.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-007.jpg`,
    `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-008.jpg`,
  ];

  return (
    generateLine(productId, styleId, thumbnailUrl, 'main', 'thumbnail')
    + generateLine(productId, styleId, regularUrl, 'main', 'full')
    + generateLine(productId, styleId, otherPhotos[0], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[1], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[2], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[3], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[4], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[5], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[6], 'other', 'full')
    + generateLine(productId, styleId, otherPhotos[7], 'other', 'full')
  );
};

const maxProducts = 1000000;
const maxStyles = 3;
const throttle = 10000;

(async function generateCSVdata() {
  try {
    await createFolder(__dirname, 'data');

    const fileName = 'photoRecords.csv';
    const csvPath = path.join(__dirname, 'data', fileName);

    await writeFile(csvPath, generateColumns());

    let throttleTracker = 1;
    let csvData = '';

    for (let productId = 1; productId <= maxProducts; productId += 1) {
      for (let styleId = 1; styleId <= maxStyles; styleId += 1) {
        csvData += generateRecord(productId, styleId);
      }
      if (throttleTracker === throttle) {
        await appendFile(csvPath, csvData);
        csvData = '';
        throttleTracker = 0;
        console.log(`Inserted product ${productId}`);
      }
      throttleTracker += 1;
    }
    await appendFile(csvPath, csvData);
    console.log(`Created file ${fileName} which contains ${maxProducts} records`);
  } catch (err) {
    console.log(err.stack);
  }
}());
