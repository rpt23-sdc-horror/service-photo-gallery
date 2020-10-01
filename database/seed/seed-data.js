// the list of product and style ids we are using for our mock data. Shared between all FEC modules
const data = [
  {
    product_id: "XX1111",
    style_id: "001"
  },
  {
    product_id: "XX1111",
    style_id: "002"
  },
  {
    product_id: "XX1111",
    style_id: "003"
  },
  {
    product_id: "AA2222",
    style_id: "001"
  },
  {
    product_id: "AA2222",
    style_id: "002"
  },
  {
    product_id: "BB3333",
    style_id: "001"
  },
]

// how to map images to URL?
// script to go to http://lorempixel.com/400/200/sports/
// download image
// upload to S3

// use bit.ly to create unique urls

module.exports = data;