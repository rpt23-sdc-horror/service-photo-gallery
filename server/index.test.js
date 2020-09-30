const request = require("supertest");
const app = require("./app.js");
const db = require("../database/connect.js");

const product_id = "XX1111";
const style_id = "001";

afterAll(() => {
  db.close();
});

describe("Photo API", () => {
  test("should get correct photo for a product + style id", async () => {
    const response = await request(app).get(`/photos/${product_id}/${style_id}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      product_id: "XX1111",
      style_id: "001",
    })
  })

  test("should get 400 error for non-existent id", async () => {
    const response = await request(app).get(`/photos/${product_id}/doesntexist`);
    expect(response.status).toBe(400);
    expect(response.body).toBeNull;
  })
})