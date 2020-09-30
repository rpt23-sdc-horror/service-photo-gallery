const db = require("../index.js");
const seed = require("./seed-db.js");
const Photo = require("../PhotoModel.js");

// Jest is a client-side JavaScript testing library developed by Facebook. Because Jest is designed primarily for testing React applications, using it to test Node.js server-side applications comes with a lot of caveats. We strongly advise against using Jest for testing any Node.js apps unless you are an expert developer with an intimate knowledge of Jest.
// If you choose to delve into dangerous waters and test Mongoose apps with Jest, here's what you need to know:
// >>> HUGO: so, I'm not sure how to use Jest here to use it with Mongoose

// describe("Seeding Photo DB:", () => {
//   // beforeAll() {
//   //   // ???
//   // }

//   const ids = [];

//   test("database is dropped before seed script runs", async () => {
//     try {
//       await seed.seedDatabase(ids);
//       const photos = await Photo.find();
//       console.log(photos);
//       expect(photos).length.toBe(0);
//       db.close();
//     } catch (err) {
//       console.log(err);
//     }
//   })
// })