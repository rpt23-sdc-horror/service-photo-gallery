const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/photos', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});