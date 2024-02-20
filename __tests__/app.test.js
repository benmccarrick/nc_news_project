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
})
describe("GET /api/topicsss", () => {
    test("status:404, responds with appropriate error status when provided a route that does not exist", () => {
    return request(app)
      .get("/api/topicsss")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('Path not found');
      });
   });
})
describe("GET /api", () => {
    test("status:200, responds with an object describing all the available endpoints on the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { endpoints } = body;
          expect(endpoints).toBeInstanceOf(Object);
          expect(endpoints).hasOwnProperty('description')
          expect(endpoints).hasOwnProperty('queries')
          expect(endpoints).hasOwnProperty('exampleResponse')
          expect(endpoints).toEqual(endpointsFile)
        });
    });
})
describe("GET /api/articles/:article_id", () => {
    test("status:200, responds with a single article", () => {
      return request(app)
        .get("/api/articles/2")
        .expect(200)
        .then(({body}) => {
            const {article} = body;
            expect(article.article_id).toBe(2)
            expect(article).hasOwnProperty('title')
            expect(article).hasOwnProperty('topic')
            expect(article).hasOwnProperty('author')
            expect(article).hasOwnProperty('body')
            expect(article).hasOwnProperty('created_at')
            expect(article).hasOwnProperty('votes')
            expect(article).hasOwnProperty('article_img_url')
        });
   });
   test("status:404 sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/222222")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article does not exist');
      });
  });
  test("status:400 sends an appropriate status and error message when given an invalid id", () => {
    return request(app)
      .get("/api/articles/not-an-article-id")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
})
describe("GET /api/articles", () => {
    test("status:200, responds with an array of articles objects", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeInstanceOf(Array);
          expect(articles).toHaveLength(13);
          articles.forEach((article) => {
            expect(article).toMatchObject({
              article_id: expect.any(Number),  
              author: expect.any(String),
              title: expect.any(String),
              topic: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              article_img_url: expect.any(String),
              comment_count: expect.any(String)
            });
          });
        });
    });
    test("status:200 articles should be sorted by date in descending order by default", () => {
        return request(app)
        .get("/api/articles")
          .expect(200)
          .then(({body}) => {
            const {articles} = body
            expect(articles).toBeSortedBy("created_at", {
                descending: true,
            });
          });
    });
    test("status:200 all articles should return without a body property present", () => {
        return request(app)
        .get("/api/articles")
          .expect(200)
          .then(({body}) => {
            const {articles} = body
            expect(articles).toBeInstanceOf(Array);
            expect(articles).toHaveLength(13);
            articles.forEach((article) => {
            expect(article.hasOwnProperty("body")).toBe(false)
            })
          });
    });
    test("status:400, responds with an error message when passed an invalid sort_by", () => {
      return request(app)
        .get("/api/articles?sort_by=not_a_sort_by")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("status:400, responds with an error message when passed an invalid order_by", () => {
      return request(app)
        .get("/api/articles?order_by=random_order")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
})