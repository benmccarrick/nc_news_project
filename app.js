const express = require("express")
const cors = require('cors')

const {handlePsqlErrors, handleCustomErrors, handleInternalErrors, handleInvalidEndpoints} = require('./controllers/errors-controller')

const endpointsRouter = require('./routes/endpoints-router')


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", endpointsRouter)

app.all("*", handleInvalidEndpoints);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleInternalErrors);


module.exports = app