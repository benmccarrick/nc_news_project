const request = require("supertest");
const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const testData = require("../db/data/test-data");
const endpointsFile = require("../endpoints.json")

beforeEach(() => {
  return seed(testData);
});

afterAll(() => {
  return db.end()
});

describe("GET /api/topics", () => {
  test("status:200, responds with an array of topics objects", () => {
    return request(app)
      .get("/api/topics")
      .expect(200)
      .then(({ body }) => {
        const { topics } = body;
        expect(topics).toBeInstanceOf(Array);
        expect(topics).toHaveLength(3);
        topics.forEach((topic) => {
          expect(topic).toMatchObject({
            description: expect.any(String),
            slug: expect.any(String),
          });
        });
      });
  });
});
describe("GET /api/topicsss", () => {
    test("status:404, responds with appropriate error status when provided a route that does not exist", () => {
  return request(app)
   .get("/api/topicsss")
   .expect(404)
   })
})
describe("GET /api", () => {
    test("status:200, responds with an object describing all the available endpoints on the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { endpoints } = body;
          console.log(endpoints)
          expect(endpoints).toBeInstanceOf(Object);
          expect(endpoints).hasOwnProperty('description')
          expect(endpoints).hasOwnProperty('queries')
          expect(endpoints).hasOwnProperty('exampleResponse')
          expect(endpoints).toEqual(endpointsFile)
        });
    });
})