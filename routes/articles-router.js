const { getArticles, getArticleById, updateArticles, addArticles, deleteArticleById } = require("../controllers/articles-controller");
const { getCommentsByArticleId, addCommentsByArticleId } = require("../controllers/comments-controller");
  
const articleRouter = require("express").Router();
  
articleRouter.get("/", getArticles);
articleRouter.get("/:article_id", getArticleById);

articleRouter.get("/:article_id/comments", getCommentsByArticleId); 
articleRouter.post("/:article_id/comments", addCommentsByArticleId);

articleRouter.post("/", addArticles);

articleRouter.patch("/:article_id", updateArticles);

articleRouter.delete("/:article_id", deleteArticleById);

module.exports = articleRouter;