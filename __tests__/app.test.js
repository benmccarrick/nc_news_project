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
    test("status:404, sends an appropriate status and error message when provided a route that does not exist", () => {
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
   test("status:404, sends an appropriate status and error message when given a valid but non-existent id", () => {
    return request(app)
      .get("/api/articles/222222")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article does not exist');
      });
  });
  test("status:400, sends an appropriate status and error message when given an invalid id", () => {
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
    test("status:200, articles should be sorted by date in descending order by default", () => {
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
    test("status:200, all articles should return without a body property present", () => {
        return request(app)
        .get("/api/articles")
          .expect(200)
          .then(({body}) => {
            const {articles} = body
            expect(articles).toBeInstanceOf(Array);
            expect(articles).toHaveLength(13);
            articles.forEach((article) => {
            expect(article.hasOwnProperty("body")).toBe(false)
            });
          });
    });
    test("status:400, sends an appropriate status and error message when passed an invalid sort_by", () => {
      return request(app)
        .get("/api/articles?sort_by=not_a_sort_by")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
    test("status:400, sends an appropriate status and error message when passed an invalid order_by", () => {
      return request(app)
        .get("/api/articles?order_by=random_order")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("Bad request");
        });
    });
})
describe("GET /api/articles/:article_id/comments", () => {
  test("status:200, responds with an array of comments for the given article_id", () => {
    return request(app)
      .get("/api/articles/1/comments")
      .expect(200)
      .then(({ body }) => {
        const { comments } = body;
        expect(comments).toBeInstanceOf(Array);
        expect(comments).toHaveLength(11);
        comments.forEach((comment) => {
          expect(comment).toMatchObject({
            comment_id: expect.any(Number),  
            author: expect.any(String),
            article_id: 1,
            body: expect.any(String),
            created_at: expect.any(String),
            votes: expect.any(Number)
          });
        });
      });
  });
  test("status:200, comments should be sorted by date with the most recent comment first by default", () => {
    return request(app)
    .get("/api/articles/1/comments")
      .expect(200)
      .then(({body}) => {
        const {comments} = body
        expect(comments).toBeSortedBy("created_at");
      });
  });
  test("status:404, sends an appropriate status and error message when given a valid but non-existent article_id", () => {
    return request(app)
      .get("/api/articles/9999/comments")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article does not exist');
      });
  });
  test("status:400, sends an appropriate status and error message when given an invalid article_id", () => {
    return request(app)
      .get("/api/articles/not-an-article-id/comments")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test("status:400, sends an appropriate status and error message when passed an invalid sort_by", () => {
    return request(app)
      .get("/api/articles/1/comments?sort_by=not_a_sort_by")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
  test("status:400, sends an appropriate status and error message when passed an invalid order_by", () => {
    return request(app)
      .get("/api/articles/1/comments?order_by=random_order")
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toBe("Bad request");
      });
  });
})
describe("POST /api/articles/:article_id/comments", () => {
  test("status:201, responds with a new comment added to the given article_id", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: 'rogersop',
        body: 'body of text'
      })
      .set("Accept", "application/json")
      .expect(201)
      .then(({body}) => {
        const {comments} = body
        expect(comments).toMatchObject({
              comment_id: expect.any(Number),
              body: 'body of text',
              author: 'rogersop',
              article_id: 1,
              created_at: expect.any(String),
              votes: 0
        });
      });
  });
  test("status:404, sends an appropriate status and error message when posting to a valid but non-existent article_id", () => {
    return request(app)
      .post("/api/articles/9999/comments")
      .send({
        username: 'rogersop',
        body: 'body of text'
      })
      .set("Accept", "application/json")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('Resource not found');
      });
  });
  test("status:400, sends an appropriate status and error message when posting to an invalid article_id", () => {
    return request(app)
    .post("/api/articles/not_an_article_id/comments")
    .send({
      username: 'rogersop',
      body: 'body of text'
    })
    .set("Accept", "application/json")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test("status:400, sends an appropriate status and error message when posting without all properties of comment request body", () => {
    return request(app)
    .post("/api/articles/1/comments")
    .send({
      username: 'rogersop',
    })
    .set("Accept", "application/json")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test("status:404, sends an appropriate status and error message when posting with an invalid username", () => {
    return request(app)
      .post("/api/articles/1/comments")
      .send({
        username: 'invalid_username',
        body: 'body of text'
      })
      .set("Accept", "application/json")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('Not found');
      });
  });
  test("status:400, sends an appropriate status and error message when posting an empty comment request body", () => {
    return request(app)
    .post("/api/articles/1/comments")
    .send({})
    .set("Accept", "application/json")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
})
describe("PATCH /api/articles/:article_id", () => {
  test("status:200, responds with an updated article when votes are incremented", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: 1000
      })
      .set("Accept", "application/json")
      .expect(200)
      .then(({body}) => {
        const {article} = body
        expect(article.votes).toBe(1100);
        expect(article.article_id).toBe(1);
        expect(article).hasOwnProperty('title');
        expect(article).hasOwnProperty('topic');
        expect(article).hasOwnProperty('author');
        expect(article).hasOwnProperty('body');
        expect(article).hasOwnProperty('created_at');
        expect(article).hasOwnProperty('votes');
        expect(article).hasOwnProperty('article_img_url');
      });
  });
  test("status:200, responds with an updated article when votes are decremented", () => {
    return request(app)
      .patch("/api/articles/1")
      .send({
        inc_votes: -100
      })
      .set("Accept", "application/json")
      .expect(200)
      .then(({body}) => {
        const {article} = body
        expect(article.votes).toBe(0);
        expect(article.article_id).toBe(1);
        expect(article).hasOwnProperty('title');
        expect(article).hasOwnProperty('topic');
        expect(article).hasOwnProperty('author');
        expect(article).hasOwnProperty('body');
        expect(article).hasOwnProperty('created_at');
        expect(article).hasOwnProperty('votes');
        expect(article).hasOwnProperty('article_img_url');
      });
  });
  test("status:404, sends an appropriate status and error message when patching a valid but non-existent article_id", () => {
    return request(app)
      .patch("/api/articles/22222")
      .send({
        inc_votes: -100
      })
      .set("Accept", "application/json")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('article does not exist');
      });
  });
  test("status:400, sends an appropriate status and error message when patching an invalid article_id", () => {
    return request(app)
    .patch("/api/articles/not_an_article_id")
    .send({
      inc_votes: -100
    })
    .set("Accept", "application/json")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
  test("status:200, sends back original unaltered article when no patch body is sent", () => {
    const articleCopy = {
      article_id: 1,
      title: 'Living in the shadow of a great man',
      topic: 'mitch',
      author: 'butter_bridge',
      body: 'I find this existence challenging',
      created_at: '2020-07-09T20:11:00.000Z',
      votes: 100,
      article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700'
    }
    return request(app)
    .patch("/api/articles/1")
    .send({  
    })
    .set("Accept", "application/json")
      .expect(200)
      .then(({body}) => {
        const {article} = body;
        expect(article).toEqual(articleCopy);
      });
  });
  test("status:400, sends an appropriate status and error message when patching with incorrect data type", () => {
    return request(app)
    .patch("/api/articles/1")
    .send({
      inc_votes: "not a number"
    })
    .set("Accept", "application/json")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
})
describe("DELETE /api/comments/:comment_id", () => {
  test("status:204, deletes the comment associated with the given id", () => {
    return request(app)
      .delete("/api/comments/2")
      .expect(204)
  });
  test("status:404, sends an appropriate status and error message when deleting a valid but non-existent comment_id", () => {
    return request(app)
      .delete("/api/comments/22222")
      .expect(404)
      .then(({body}) => {
        expect(body.msg).toBe('Resource not found');
      });
  });
  test("status:400, sends an appropriate status and error message when deleting an invalid comment_id", () => {
    return request(app)
      .delete("/api/comments/not_a_comment")
      .expect(400)
      .then(({body}) => {
        expect(body.msg).toBe('Bad request');
      });
  });
})    
describe("GET /api/users", () => {
  test("status:200, responds with an array of users objects", () => {
    return request(app)
      .get("/api/users")
      .expect(200)
      .then(({ body }) => {
        const { users } = body;
        expect(users).toBeInstanceOf(Array);
        expect(users).toHaveLength(4);
        users.forEach((user) => {
          expect(user).toMatchObject({
            username: expect.any(String),
            name: expect.any(String),
            avatar_url: expect.any(String)
          });
        });
      });
  });
})