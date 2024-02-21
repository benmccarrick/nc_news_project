const express = require("express")
const {getTopics} = require('./controllers/topics-controller')
const {getAvailableEndpoints} = require('./controllers/endpoints-controller')
const {getArticleById, getArticles, updateArticles} = require('./controllers/articles-controller')
const {getCommentsByArticleId, addCommentsByArticleId, deleteCommentById} = require('./controllers/comments-controller')
const {getUsers} = require('./controllers/users-controller')
const {handlePsqlErrors, handleCustomErrors, handleInternalErrors, handleInvalidEndpoints} = require('./controllers/errors-controller')

const app = express();
app.use(express.json());


app.get("/api/topics", getTopics);
app.get("/api", getAvailableEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId);
app.get("/api/users", getUsers);

app.post("/api/articles/:article_id/comments", addCommentsByArticleId);

app.patch("/api/articles/:article_id", updateArticles);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("/*", handleInvalidEndpoints);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app