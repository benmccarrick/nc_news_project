const express = require("express")
const {getTopics} = require('./controllers/topics-controller')
const {getAvailableEndpoints} = require('./controllers/endpoints-controller')
const {getArticleById, getArticles} = require('./controllers/articles-controller')
const {getCommentsByArticleId} = require('./controllers/comments-controller')
const {handlePsqlErrors, handleCustomErrors, handleInternalErrors, handleInvalidEndpoints} = require('./controllers/errors-controller')

const app = express();


app.get("/api/topics", getTopics);
app.get("/api", getAvailableEndpoints);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles", getArticles);
app.get("/api/articles/:article_id/comments", getCommentsByArticleId)

app.all("/*", handleInvalidEndpoints)
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app