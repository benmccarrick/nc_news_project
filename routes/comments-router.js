const { deleteCommentById, updateCommentById } = require("../controllers/comments-controller");
  
const commentRouter = require("express").Router();
  
commentRouter.delete("/:comment_id", deleteCommentById);
commentRouter.patch("/:comment_id", updateCommentById);

module.exports = commentRouter;