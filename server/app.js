const express = require('express');

const app = express();

const photoDB = require('../database/index.js');

app.get('/photos/:productid/:styleid', async (req, res) => {
  try {
    const productId = Number(req.params.productid);
    const styleId = req.params.styleid;
    const photos = await photoDB.getPhotosById(productId, styleId);
    res.send(photos);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
});

// add another endpoint for getting all photos by product ID

module.exports = app;
