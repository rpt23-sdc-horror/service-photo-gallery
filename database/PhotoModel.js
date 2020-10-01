const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  product_id: { type: String, required: true, minlength: 6, maxlength: 6 },
  style_id: { type: String, required: true, minlength: 3, maxlength: 3 },
  main_photo: {
    thumbnail_url: { type: String, required: true, maxlength: 200 },
    regular_url: { type: String, required: true, maxlength: 200 },
  },
  other_photos: [
    {
      regular_url: { type: String, required: true, maxlength: 200 },
    },
  ],
});

const Photo = mongoose.model("Photo", photoSchema);

module.exports = Photo;