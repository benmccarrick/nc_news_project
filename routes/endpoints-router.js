const { getAvailableEndpoints } = require("../controllers/endpoints-controller");
const articleRouter = require("./articles-router");
const commentRouter = require("./comments-router");
const topicRouter = require("./topics-router");
const userRouter = require("./users-router");

const endpointsRouter = require("express").Router();

endpointsRouter.use("/articles", articleRouter);
endpointsRouter.use("/topics", topicRouter);
endpointsRouter.use("/users", userRouter);
endpointsRouter.use("/comments", commentRouter);
endpointsRouter.get("/", getAvailableEndpoints);

module.exports = endpointsRouter;