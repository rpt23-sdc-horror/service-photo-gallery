/* eslint-disable no-await-in-loop */
const { uploadRandomImage } = require('../../utils/s3bucket');
const { rng } = require('../../utils/math');

const maxProducts = 1000;
const maxStyles = 3;
const maxOthers = 8;

(async function seedS3Bucket() {
  try {
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
  } catch (err) {
    console.log(`Error Uploading Images\n${err}`);
    process.exit(1);
  }
}());
