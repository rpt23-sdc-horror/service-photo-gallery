const express = require('express');

const app = express();

const photoDB = require('../database/index.js');

app.get('/photos/:productid/:styleid', async (req, res) => {
  try {
    const photos = await photoDB.getPhotosById(req.params.productid, req.params.styleid);
    res.send(photos);
  } catch (err) {
    console.log(err);
    res.status(400).send({ err: err.message });
  }
});

// add another endpoint for getting all photos by product ID

module.exports = app;
