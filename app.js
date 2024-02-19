const express = require("express")
const {getTopics} = require('./controllers/topics-controller')
const {handlePsqlErrors, handleCustomErrors, handleInternalErrors} = require('./controllers/errors-controller')

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);



app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app