const express = require("express");
const app = express();

const db = require("../database/index.js");

app.get("/photos/:productid/:styleid", async (req, res) => {
  const photos = await db.getPhotosById(req.params.productid, req.params.styleid);
  res.send(photos);
})

const port = 3000;

app.listen(port, () => {
  console.log(`Photo service listening on ${port}`)
})