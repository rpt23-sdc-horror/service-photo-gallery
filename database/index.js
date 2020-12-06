require('dotenv').config();
const couchbase = require('couchbase');

const cluster = new couchbase.Cluster(process.env.CB_URI, {
  username: process.env.CB_USERNAME,
  password: process.env.CB_PASSWORD,
});

const bucket = cluster.bucket(process.env.CB_BUCKET);
