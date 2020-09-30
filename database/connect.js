const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/photos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log("Mongoose: connected to Photos DB!")
});

db.once('close', () => {
  // this doesn't appear to work well with jest?
  // console.log("Mongoose: connection to Photos DB closed!")
});

module.exports = db;