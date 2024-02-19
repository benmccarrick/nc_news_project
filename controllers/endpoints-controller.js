const endpoints = require("../endpoints.json")

exports.getAvailableEndpoints = (req, res, next) => {

    return res.status(200).send({endpoints})

}
