const mongoose = require('mongoose');

// TO DO: this is replaced when deploying via docker...
mongoose.connect('mongodb://mongo:27017', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log(`Mongoose: connected to ${db.name} DB!`);
});

module.exports = db;
