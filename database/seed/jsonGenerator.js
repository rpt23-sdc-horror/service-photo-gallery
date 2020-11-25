/* eslint-disable no-await-in-loop */
const path = require('path');
const { createFolder, writeFile } = require('../../utils/fs');
const { rng } = require('../../utils/math');

require('dotenv').config();

const baseURL = process.env.AWS_BUCKET_BASE_URL;

const generateRecord = (productId, styleId) => {
  const randomProductId = rng(1, 1000);

  return {
    product_id: productId,
    style_id: `00${styleId}`,
    main_photo: {
      thumbnail_url: `${baseURL}/products/id-${randomProductId}/style-${styleId}/main-thumbnail.jpg`,
      regular_url: `${baseURL}/products/id-${randomProductId}/style-${styleId}/main.jpg`,
    },
    other_photos: [
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-001.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-002.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-003.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-004.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-005.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-006.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-007.jpg`,
      `${baseURL}/products/id-${randomProductId}/style-${styleId}/other-008.jpg`,
    ],
  };
};

let startProductId = 1;
let endProductId = 100000;
const recordsPerFile = 100000;
const maxStyles = 3;
const filesAmountMax = 1;

(async function generateJSONdata() {
  try {
    await createFolder(__dirname, 'data');

    for (let filesAmount = 1; filesAmount <= filesAmountMax; filesAmount += 1) {
      const fileName = `photoRecords${filesAmount}.json`;
      const filePath = path.join(__dirname, 'data', fileName);

      const jsonData = [];

      for (let productId = startProductId; productId <= endProductId; productId += 1) {
        for (let styleId = 1; styleId <= maxStyles; styleId += 1) {
          jsonData.push(generateRecord(productId, styleId));
        }
      }

      startProductId += recordsPerFile;
      endProductId += recordsPerFile;

      await writeFile(filePath, JSON.stringify(jsonData, null, 2));
      console.log(`Created file ${fileName} which contains ${recordsPerFile} records`);
    }
    console.log(`Files contain product_ids from 1 - ${recordsPerFile * filesAmountMax}`);
  } catch (err) {
    console.log(err.stack);
  }
}());
