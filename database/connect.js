const mongoose = require('mongoose');

mongoose.connect('mgodb://localhost:27017/photos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log(`Mongoose: connected to ${db.name} DB!`)
});

// this doesn't appear to work well with jest?
// db.once('close', () => {
//   // console.log("Mongoose: connection to Photos DB closed!")
// });

module.exports = db;