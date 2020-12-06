// express + routes
const app = require('./app');

// open connection to Photos DB
require('../database/inheritedDatabase/connect.js');

const port = 3000;

app.listen(port, () => {
  console.log(`Photo service listening on ${port}`);
});
