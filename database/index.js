const couchbase = require('couchbase');
require('dotenv').config();

try {
  const cluster = new couchbase.Cluster(process.env.CB_URI, {
    username: process.env.CB_USERNAME,
    password: process.env.CB_PASSWORD,
  });

  cluster.bucket(process.env.CB_BUCKET);

  console.log('Connected to Couchbase');

  module.exports = {
    cluster,
  };
} catch (err) {
  console.log('Error connecting to Couchbase:\n', err);
  process.exit(1);
}
