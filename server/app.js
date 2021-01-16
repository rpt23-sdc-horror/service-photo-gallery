const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const redis = require('redis');

const photoDB = require('../database/methods/photoURLs');

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_PW,
});

client.on('error', err => {
  console.log('Error ' + err);
});

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/photos/:productid/:styleid', async (req, res) => {
  try {
    const photos = await photoDB.getPhotosByStyleId(
      Number(req.params.productid),
      req.params.styleid,
    );

    if (photos.length === 0) {
      res.status(404).send('Photo Information Not Found');
    } else {
      client.setex(`${Number(req.params.productid)}-${req.params.styleid}`, 600, JSON.stringify(photos[0]));

      res.json([photos[0].photo_urls.main_photo.regular_url, ...photos[0].photo_urls.other_photos]);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.');
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/photos', async (req, res) => {
  try {
    const createDocument = {
      product_id: req.body.product_id,
      style_id: req.body.style_id,
      main_photo: req.body.main_photo,
      other_photos: req.body.other_photos,
    };

    await photoDB.createPhoto(createDocument);

    res.status(201).send('Resource Created Successfully');
  } catch (err) {
    res.status(500).send('Internal Server Error.');
  }
});

app.put('/photos/:productid', async (req, res) => {
  try {
    const targetDocument = {
      product_id: Number(req.params.productid),
      style_id: req.body.style_id,
    };

    await photoDB.updatePhoto(targetDocument, req.body.updateValue);

    res.status(204).send('Resource Updated Successfully');
  } catch (err) {
    res.status(500).send('Internal Server Error.');
  }
});

app.delete('/photos/:productid', async (req, res) => {
  try {
    await photoDB.deletePhoto(Number(req.params.productid));

    res.status(204).send('Resource Deleted Successfully');
  } catch (err) {
    res.status(500).send('Internal Server Error.');
  }
});

module.exports = app;
