const request = require('supertest');
const app = require('./app.js');
const db = require('../database/connect.js');
require('regenerator-runtime/runtime');

const productId = 1;
const styleId = '001';

afterAll(() => {
  db.close();
});

describe('API endpoint: get photos for a specific style', () => {
  test('should get correct photo for a product + style id', async () => {
    const response = await request(app).get(`/photos/${productId}/${styleId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(9);
    expect(response.body[0]).toBe('https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg');
    expect(response.body[8]).toBe('https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/57-002.jpg');
  });

  test('should get 400 error for non-existent id', async () => {
    const response = await request(app).get(`/photos/${productId}/doesntexist`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ err: `no document found for productId ${productId} and styleId doesntexist` });
  });
});

describe('API endpoint: get all photos for a product', () => {
  test('should get all styles and main photos for a product ID', async () => {
    const response = await request(app).get(`/photos/${productId}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(3);
    expect(response.body[0]).toMatchObject({
      product_id: 1,
      style_id: '001',
      main_photo: {
        thumbnail_url: 'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/thumbnail/1-001.jpg',
        regular_url: 'https://ultimate-nike.s3.us-west-1.amazonaws.com/photos/main/regular/1-001.jpg',
      },
    });
  });

  test('should get 400 error for non-existent product id', async () => {
    const response = await request(app).get('/photos/245');
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ err: 'no document found for productId 245' });
  });
});

// add test: what if there's a database error, what will happen?
