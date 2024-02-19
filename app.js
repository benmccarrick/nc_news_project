const {getTopics} = require('./controllers/topics-controller')
const {getAvailableEndpoints} = require('./controllers/endpoints-controller')
const {handleCustomErrors, handleInternalErrors} = require('./controllers/errors-controller')


app.get("/api/topics", getTopics);
app.get("/api", getAvailableEndpoints);


app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app