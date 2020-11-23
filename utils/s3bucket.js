// eslint-disable-next-line import/no-extraneous-dependencies
const AWS = require('aws-sdk');
const fetch = require('node-fetch');

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

module.exports = {
  uploadRandomImage,
};
