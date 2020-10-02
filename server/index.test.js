const request = require('supertest');
const app = require('./app.js');
const db = require('../database/connect.js');

const productId = 'XX1111';
const styleId = '001';

afterAll(() => {
  db.close();
});

describe('Photo API', () => {
  test('should get correct photo for a product + style id', async () => {
    const response = await request(app).get(`/photos/${productId}/${styleId}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      product_id: 'XX1111',
      style_id: '001',
    });
  });

  test('should get 400 error for non-existent id', async () => {
    const response = await request(app).get(`/photos/${productId}/doesntexist`);
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ err: `no document found for productId ${productId} and styleId doesntexist` });
  });
});

// add test: what if there's a database error, what will happen?
