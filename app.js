const express = require("express")
const {getTopics} = require('./controllers/topics-controller')
const {getAvailableEndpoints} = require('./controllers/endpoints-controller')
const {handlePsqlErrors, handleCustomErrors, handleInternalErrors} = require('./controllers/errors-controller')

const app = express();
app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api", getAvailableEndpoints);



app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app