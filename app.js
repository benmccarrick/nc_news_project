const express = require("express")

const {handlePsqlErrors, handleCustomErrors, handleInternalErrors, handleInvalidEndpoints} = require('./controllers/errors-controller')

const endpointsRouter = require('./routes/endpoints-router')

const app = express();
app.use(express.json());

app.use("/api", endpointsRouter)

app.all("*", handleInvalidEndpoints);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app