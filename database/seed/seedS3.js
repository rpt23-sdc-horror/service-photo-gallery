/* eslint-disable no-await-in-loop */
// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const { rng } = require('../../utils/math');

require('dotenv').config();

const s3 = new AWS.S3();

const uploadToS3Bucket = async (productId, buffer, path) => s3.upload({
  Bucket: process.env.AWS_S3_BUCKET,
  Key: `products/${path}`,
  Body: buffer,
  ContentType: 'image/jpg',
  ACL: 'public-read',
}).promise();

const uploadRandomImage = async (productId, styleId, randomImageId, width, height, fileName) => {
  const buffer = await fetch(`https://picsum.photos/seed/${randomImageId}/${width}/${height}`);
  const bufferPath = `id-${productId}/style-${styleId}/${fileName}.jpg`;

  return uploadToS3Bucket(productId, buffer.body, bufferPath);
};

const maxProducts = 1000;
const maxStyles = 3;
const maxOthers = 8;

try {
  (async function loop() {
    for (let productId = 1; productId <= maxProducts; productId += 1) {
      for (let styleId = 1; styleId <= maxStyles; styleId += 1) {
        const randomImageId = rng(1, 1000000);
        await uploadRandomImage(productId, styleId, randomImageId, 1024, 768, 'main');
        await uploadRandomImage(productId, styleId, randomImageId, 75, 75, 'main-thumbnail');
        console.log(`Uploaded main images for product ${productId} style ${styleId}`);

        for (let otherPhoto = 1; otherPhoto <= maxOthers; otherPhoto += 1) {
          const randomOtherId = rng(1, 1000000);
          await uploadRandomImage(productId, styleId, randomOtherId, 1024, 768, `other-00${otherPhoto}`);
        }
        console.log(`Uploaded other images for product ${productId} style ${styleId}`);
      }
    }
    console.log('Successfully Uploaded Images to S3');
    process.exit(0);
  }());
} catch (err) {
  console.log(`Error Uploading Images\n${err}`);
  process.exit(1);
}
