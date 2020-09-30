const express = require("express");
const app = express();

const db = require("../database/index.js");

app.get("/photos/:productid/:styleid", async (req, res) => {
  try {
    const photos = await db.getPhotosById(req.params.productid, req.params.styleid);
    res.send(photos);
  } catch (err) {
    console.log(err);
    res.status(400).send();
  }
})

module.exports = app;