const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');

const photoDB = require('../database/inheritedDatabase/index.js');

const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/photos/:productid', async (req, res) => {
  try {
    const productId = Number(req.params.productid);
    const photos = await photoDB.getPhotosByProductId(productId);

    if (photos.length === 0) {
      res.status(404).send('Photo Information Not Found');
      return;
    }

    res.json(photos);
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error.');
  }
});

app.get('/photos/:productid/:styleid', async (req, res) => {
  try {
    const productId = Number(req.params.productid);
    const styleId = req.params.styleid;
    const photos = await photoDB.getPhotosByStyleId(productId, styleId);

    if (photos === null) {
      res.status(404).send('Photo Information Not Found');
      return;
    }

    res.json(photos);
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

    const updateValues = {
      ...req.body.main_photo && { main_photo: req.body.main_photo },
      ...req.body.other_photos && { other_photos: req.body.other_photos },
    };

    await photoDB.updatePhoto(targetDocument, updateValues);

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
