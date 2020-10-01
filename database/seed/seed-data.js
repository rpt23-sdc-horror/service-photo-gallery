// the list of product and style ids we are using for our mock data. Shared between all FEC modules
const data = [
  {
    productId: 'XX1111',
    styleId: '001',
  },
  {
    productId: 'XX1111',
    styleId: '002',
  },
  {
    productId: 'XX1111',
    styleId: '003',
  },
  {
    productId: 'AA2222',
    styleId: '001',
  },
  {
    productId: 'AA2222',
    styleId: '002',
  },
  {
    productId: 'BB3333',
    styleId: '001',
  },
];

// how to map images to URL?
// script to go to http://lorempixel.com/400/200/sports/
// download image
// upload to S3

// use bit.ly to create unique urls

module.exports = data;
