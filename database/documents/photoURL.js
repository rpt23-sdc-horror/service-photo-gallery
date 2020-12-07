const { isObject } = require('../../utils/validation');

const isValidOtherPhotos = (other_photos) => {
  if (Array.isArray(other_photos) === true) {
    for (let i = 0; i < other_photos.length; i += 1) {
      if (typeof other_photos[i] !== 'string') return false;
    }
  }

  return true;
};

const isValidDocument = (params) => {
  if (typeof params.product_id !== 'number'
  || typeof params.style_id !== 'string'
  || isObject(params.main_photo) !== true
  || typeof params.main_photo.thumbnail_url !== 'string'
  || typeof params.main_photo.regular_url !== 'string'
  || isValidOtherPhotos(params.other_photos) !== true) {
    return false;
  }

  return true;
};

const generatePhotoURL = (params) => {
  if (!isValidDocument(params)) throw new Error('Invalid Params');

  return {
    product_id: params.product_id,
    style_id: params.style_id,
    main_photo: {
      thumbnail_url: params.main_photo.thumbnail_url,
      regular_url: params.main_photo.regular_url,
    },
    other_photos: params.other_photos,
  };
};

module.exports = {
  generatePhotoURL,
};
