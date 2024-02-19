const express = require("express")
const {getTopics} = require('./controllers/topics-controller')
const {getAvailableEndpoints} = require('./controllers/endpoints-controller')
const {getArticleById} = require('./controllers/articles-controller')
const {handlePsqlErrors, handleCustomErrors, handleInternalErrors} = require('./controllers/errors-controller')

const app = express();


app.get("/api/topics", getTopics);
app.get("/api", getAvailableEndpoints);
app.get("/api/articles/:article_id", getArticleById);

app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app