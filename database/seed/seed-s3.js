const AWS = require('aws-sdk');

require('dotenv').config();

// Set the Region
// AWS.config.update({region: 'us-west-2'});

const bucketName = 'ultimate-nike';

// const s3 = new AWS.S3({
//   params: { Bucket: bucketName },
// });

  // Use S3 ManagedUpload class as it supports multipart uploads
  var upload = new AWS.S3.ManagedUpload({
    params: {
      Bucket: bucketName,
      Key: 'yo wtf',
      Body: file,
      ACL: "public-read"
    }
  });

  var promise = upload.promise();

  promise.then(
    function(data) {
      alert("Successfully uploaded photo.");
      viewAlbum(albumName);
    },
    function(err) {
      return alert("There was an error uploading your photo: ", err.message);
    }
  );

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
