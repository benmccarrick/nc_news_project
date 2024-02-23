const { getArticles, getArticleById, updateArticles } = require("../controllers/articles-controller");
const { getCommentsByArticleId, addCommentsByArticleId } = require("../controllers/comments-controller");
  
const articleRouter = require("express").Router();
  
articleRouter.get("/", getArticles);
articleRouter.get("/:article_id", getArticleById);

articleRouter.get("/:article_id/comments", getCommentsByArticleId); 
articleRouter.post("/:article_id/comments", addCommentsByArticleId);

articleRouter.patch("/:article_id", updateArticles);

module.exports = articleRouter;