const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

require('dotenv').config();

// Set the Region
// AWS.config.region = 'us-west-1';

const bucketName = 'ultimate-nike';

const readPhoto = async () => {
  try {
    const response = await fetch('http://lorempixel.com/400/200/sports/');
    console.log(response.body);
    return response.body;
  } catch (err) {
    console.log(err);
  }
}

// readPhoto();

console.log(path.join(__dirname, 'test-photo.png'))

// const fileStream = fs.createReadStream(path.join(__dirname, 'test-photo.png'));
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// console.log(fileStream);

// Use S3 ManagedUpload class as it supports multipart uploads


const uploadPhoto = async () => {
  try {
    const stream = await readPhoto();
    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: bucketName,
        Key: 'photos/whatever.jpg',
        Body: stream,
        ContentType: 'image/png',
        ACL: 'public-read',
      }
    });
    const promise = upload.promise();
    const data = await promise;
    console.log('Successfully uploaded photo.', data);
  } catch (err) {
    console.log(err);
  }

}

uploadPhoto();




// call S3 to retrieve upload file to specified bucket
// var uploadParams = {Bucket: bucketName, Key: '', Body: ''};
// var file = process.argv[3];

// // Configure the file stream and obtain the upload parameters
// var fs = require('fs');
// var fileStream = fs.createReadStream(file);
// fileStream.on('error', function(err) {
//   console.log('File Error', err);
// });
// uploadParams.Body = fileStream;
// var path = require('path');
// uploadParams.Key = path.basename(file);

// call S3 to retrieve upload file to specified bucket
// s3.upload (uploadParams, function (err, data) {
//   if (err) {
//     console.log("Error", err);
//   } if (data) {
//     console.log("Upload Success", data.Location);
//   }
// });
