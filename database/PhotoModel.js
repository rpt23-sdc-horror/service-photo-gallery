const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema({
  product_style_id: { type: String, required: true, maxlength: 25 },
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

export default Photo;