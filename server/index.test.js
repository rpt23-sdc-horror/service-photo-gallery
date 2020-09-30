const request = require("supertest");
const app = require("./app.js");
const db = require("../database/connect.js");

afterAll(() => {
  db.close();
});

describe("Photo API", () => {
  test("should get correct photo for a product + style id", async () => {
    // const result = await request(app).get("/photos/XX1111/001");
    // console.log(result);
    // expect(result.product_id).toEqual("XX1111");
    await request(app).get("/photos/XX1111/001").expect(200);
  })

  test("should get 400 error for non-existent id", async () => {
    await request(app).get("/photos/XX1111/doesntexist").expect(400);
  })
})