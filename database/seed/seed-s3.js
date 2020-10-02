const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config();

// Set the Region
AWS.config.region = 'us-west-1';

const bucketName = 'ultimate-nike';

const readPhoto = async () => {
  try {
    const response = await fetch('http://lorempixel.com/400/200/sports/');
    return response.body;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// urls array
const urls = [];

const writeUrlsToFile = async (data) => {
  try {
    const filePath = path.join(__dirname, 'seed-urls.json');
    await fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('wrote urls to file');
  } catch (err) {
    console.log(err);
  }
};

const uploadPhoto = async (key) => {
  try {
    const stream = await readPhoto();
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: `photos/${key}.jpg`,
        Body: stream,
        ContentType: 'image/png',
        ACL: 'public-read',
      }
    });
    const promise = upload.promise();
    const data = await promise;
    console.log('Successfully uploaded photo:', data);
    urls.push(data.Location);
  } catch (err) {
    console.log(err);
  }

}

const findAndUploadMultiplePhotos = async (number) => {
  try {
    for (let i = 1; i <= number; i += 1) {
      await uploadPhoto(`other/${i}`);
    }
    writeUrlsToFile(urls);
  } catch (err) {
    console.log(err);
  }
};

findAndUploadMultiplePhotos(2);

