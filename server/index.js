const express = require("express");
const app = express();

app.get("/photos/:productid/:styleid", (req, res) => {
  console.log(req.params);
  const photos = [];
  res.send(photos);
})

const port = 3000;

app.listen(port, () => {
  console.log(`Photo service listening on ${port}`)
})