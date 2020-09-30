const express = require("express");
const app = express();

const db = require("../database/index.js");

app.get("/photos/:productid/:styleid", async (req, res) => {
  const photos = await db.getPhotosById(req.params.productid, req.params.styleid);
  res.send(photos);
})

module.exports = app;