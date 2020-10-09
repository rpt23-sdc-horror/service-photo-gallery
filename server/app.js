const express = require('express');
const path = require('path');

const app = express();

const photoDB = require('../database/index.js');

app.use(express.static(path.join(__dirname, '../public')));

// get all main photos (regular and thumbnail) for all styles by product ID
app.get('/photos/:productid', async (req, res) => {
  try {
    const productId = Number(req.params.productid);
    const photos = await photoDB.getPhotosByProductId(productId);
    res.send(photos);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
});

// get all photos (including other photos) by style ID
app.get('/photos/:productid/:styleid', async (req, res) => {
  try {
    const productId = Number(req.params.productid);
    const styleId = req.params.styleid;
    const photos = await photoDB.getPhotosByStyleId(productId, styleId);
    res.send(photos);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
});

// dev endpoint for single photo gallery component
app.get('*', async (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = app;
