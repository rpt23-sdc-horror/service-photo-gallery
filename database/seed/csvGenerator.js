/* eslint-disable no-await-in-loop */
const path = require('path');
const { createFolder, writeFile, appendFile } = require('../../utils/fs');
const { rng } = require('../../utils/math');

require('dotenv').config();

const generateUrlColumns = () => (
  'product_id,style_id,photo_url,photo_type_id,photo_size_id\n'
);

const generateUrlRow = (productId, styleId, photoURL, photoTypeId, photoSizeId) => (
  `${productId},${styleId},${photoURL},${photoTypeId},${photoSizeId}\n`
);

const generateUrlRecord = (productId, styleId) => {
  const randomProductId = rng(1, 1000);

  const thumbnailUrl = `/products/id-${randomProductId}/style-${styleId}/main-thumbnail.jpg`;
  const regularUrl = `/products/id-${randomProductId}/style-${styleId}/main.jpg`;
  const otherPhotos = [
    `/products/id-${randomProductId}/style-${styleId}/other-001.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-002.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-003.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-004.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-005.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-006.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-007.jpg`,
    `/products/id-${randomProductId}/style-${styleId}/other-008.jpg`,
  ];

  return (
    generateUrlRow(productId, styleId, thumbnailUrl, 1, 2)
    + generateUrlRow(productId, styleId, regularUrl, 1, 1)
    + generateUrlRow(productId, styleId, otherPhotos[0], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[1], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[2], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[3], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[4], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[5], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[6], 2, 1)
    + generateUrlRow(productId, styleId, otherPhotos[7], 2, 1)
  );
};

const maxProducts = 335000;
const maxStyles = 3;
const throttle = 10000;

(async function generateCSVdataPhotoUrl() {
  try {
    await createFolder(path.join(__dirname, 'data'));

    const fileName = 'photo_urls.csv';
    const filePath = path.join(__dirname, 'data', fileName);

    await writeFile(filePath, generateUrlColumns());

    let throttleTracker = 1;
    let csvData = '';

    for (let productId = 1; productId <= maxProducts; productId += 1) {
      for (let styleId = 1; styleId <= maxStyles; styleId += 1) {
        csvData += generateUrlRecord(productId, styleId);
      }
      if (throttleTracker === throttle) {
        await appendFile(filePath, csvData);
        csvData = '';
        throttleTracker = 0;
        console.log(`Inserted product ${productId} into ${fileName}`);
      }
      throttleTracker += 1;
    }
    await appendFile(filePath, csvData);
    console.log(`Created file ${fileName} which contains ${maxProducts} rows`);
  } catch (err) {
    console.log(err.stack);
  }
}());

(async function generateCSVdataProducts() {
  try {
    await createFolder(path.join(__dirname, 'data'));

    const fileName = 'products.csv';
    const filePath = path.join(__dirname, 'data', fileName);

    await writeFile(filePath, 'product_id\n');

    let throttleTracker = 1;
    let csvData = '';

    for (let productId = 1; productId <= maxProducts; productId += 1) {
      csvData += `${productId}\n`;

      if (throttleTracker === throttle) {
        await appendFile(filePath, csvData);
        csvData = '';
        throttleTracker = 0;
        console.log(`Inserted product ${productId} into ${fileName}`);
      }
      throttleTracker += 1;
    }
    await appendFile(filePath, csvData);
    console.log(`Created file ${fileName} which contains ${maxProducts} rows`);
  } catch (err) {
    console.log(err.stack);
  }
}());

(async function generateCSVdataStyles() {
  try {
    await createFolder(path.join(__dirname, 'data'));

    const fileName = 'styles.csv';
    const filePath = path.join(__dirname, 'data', fileName);

    await writeFile(filePath, 'style_id,style\n');

    const csvData = '1,001\n2,002\n3,003\n';

    await appendFile(filePath, csvData);
    console.log(`Created file ${fileName} which contains 3 rows`);
  } catch (err) {
    console.log(err.stack);
  }
}());

(async function generateCSVdataPhotoTypes() {
  try {
    await createFolder(path.join(__dirname, 'data'));

    const fileName = 'photo_types.csv';
    const filePath = path.join(__dirname, 'data', fileName);

    await writeFile(filePath, 'photo_type_id,photo_type\n');

    const csvData = '1,main\n2,other\n';

    await appendFile(filePath, csvData);
    console.log(`Created file ${fileName} which contains 2 rows`);
  } catch (err) {
    console.log(err.stack);
  }
}());

(async function generateCSVdataPhotoSizes() {
  try {
    await createFolder(path.join(__dirname, 'data'));

    const fileName = 'photo_sizes.csv';
    const filePath = path.join(__dirname, 'data', fileName);

    await writeFile(filePath, 'photo_size_id,photo_size\n');

    const csvData = '1,full\n2,thumbnail\n';

    await appendFile(filePath, csvData);
    console.log(`Created file ${fileName} which contains 2 rows`);
  } catch (err) {
    console.log(err.stack);
  }
}());
