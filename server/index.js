// Request:
// GET /photos/:productid/:styleid

// Response object (JSON):
const response = {
  _id: `<Mongo ObjectID>`,
  product_style_id: "CJ6741-003",
  main_photo: {
    _id: `<Mongo ObjectID>`,
    thumbnail_url: "https://ultimate_nike.s3.amazonaws.com/photos/FlI7pOPrf",
    regular_url: "https://ultimate_nike.s3.amazonaws.com/photos/ak7LMO43d",
  },
  other_photos: [
    // these are extra photos different from the main photo
    // only main photo will have thumbnail size
    {
      _id: `<Mongo ObjectID>`,
      regular_url: "https://ultimate_nike.s3.amazonaws.com/photos/ak7LMO43d",
    },
    {
      _id: `<Mongo ObjectID>`,
      regular_url: "https://ultimate_nike.s3.amazonaws.com/photos/NHV4Lksp2",
    },
    {
      _id: `<Mongo ObjectID>`,
      regular_url: "https://ultimate_nike.s3.amazonaws.com/photos/NB21suRE4",
    },
  ],
};

// DB schema
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

// INSTAGRAM MODULE:
// Request:
// GET /instagrams/:productid

// Response object (JSON):
const response = {
  _id: `<Mongo ObjectID>`,
  product_id: "CJ6741",
  list: [
    {
      _id: `<Mongo ObjectID>`,
      photo_url: "https://ultimate_nike.s3.amazonaws.com/photos/ak7LMO43d",
      date_posted:
        "<Date object> Thu Sep 24 2020 15:53:54 GMT-0700 (Pacific Daylight Time)",
      likes: 15,
      user: {
        name: "windzchill",
        avatar_url: "https://ultimate_nike.s3.amazonaws.com/photos/007",
      },
    },
    {
      _id: `<Mongo ObjectID>`,
      photo_url: "https://ultimate_nike.s3.amazonaws.com/photos/NHV4Lksp2",
      date_posted:
        "<Date object> Wed Oct 02 2017 13:42:98 GMT-0700 (Pacific Daylight Time)",
      likes: 223,
      user: {
        name: "michael.dieseltraining",
        avatar_url: "https://ultimate_nike.s3.amazonaws.com/photos/008",
      },
    },
  ],
};

// DB schema
const mongoose = require("mongoose");

const instagramSchema = new mongoose.Schema({
  product_id: { type: String, required: true, maxlength: 25 },
  list: [
    {
      photo_url: { type: String, required: true, maxlength: 200 },
      date_posted: { type: Date },
      likes: { type: Number, default: 0 },
      user: {
        name: { type: String, required: true, maxlength: 50, trim: true },
        avatar_url: { type: String, maxlength: 200 },
      },
    },
  ],
});

const Instagram = mongoose.model("Instagram", instagramSchema);


