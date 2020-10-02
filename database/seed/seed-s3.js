const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config();

// Set the Region
AWS.config.region = 'us-west-1';

const bucketName = 'ultimate-nike';
const urls = [];

// get a random photo from Lorem Pixel (different each time)
const getPhoto = async (width, height) => {
  try {
    const response = await fetch(`http://lorempixel.com/${width}/${height}/sports/`);
    return response.body;
  } catch (err) {
    console.log(err);
    return null;
  }
};

// store url array in file
// should refactor this later to be able to store multiple arrays in the same file
const writeUrlsToFile = async (data) => {
  try {
    const filePath = path.join(__dirname, 'seed-urls.json');
    await fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    console.log('wrote urls to file');
  } catch (err) {
    console.log(err);
  }
};

const uploadPhoto = async (key, width, height) => {
  try {
    const stream = await getPhoto(width, height);
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: `photos/${key}.jpg`,
        Body: stream,
        ContentType: 'image/png',
        ACL: 'public-read',
      },
    });
    const promise = upload.promise();
    const data = await promise;
    console.log('Successfully uploaded photo:', data);
    urls.push(data.Location);
  } catch (err) {
    console.log(err);
  }
};

const findAndUploadMultiplePhotos = async (number, urlKey, width, height) => {
  try {
    for (let i = 1; i <= number; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await uploadPhoto(`${urlKey}/${i}`, width, height);
    }
  } catch (err) {
    console.log(err);
  }
};

// photo size images:
// regular: 1024 width x 768 height
// thumbnail: 160 width x 160 height

const seedPhotos = async () => {
  try {
    // Upload "main" photos regular size
    await findAndUploadMultiplePhotos(5, 'main/regular', 1024, 768);

    // Upload "main" photos thumbnail size
    await findAndUploadMultiplePhotos(5, 'main/thumbnail', 160, 160);

    // Upload "other" photos
    // findAndUploadMultiplePhotos(5, 'other', 1024, 768);

    writeUrlsToFile(urls);
  } catch (err) {
    console.log(err);
  }
};

seedPhotos();
