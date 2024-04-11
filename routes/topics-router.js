const { getTopics, addTopics } = require("../controllers/topics-controller");

const topicRouter = require("express").Router();

topicRouter.get("/", getTopics);
topicRouter.post("/", addTopics)

module.exports = topicRouter;
