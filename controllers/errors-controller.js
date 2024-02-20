exports.handleInvalidEndpoints = (req, res, next) => {
    res.status(404).send({msg: "Path not found"})
}

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02") {
        res.status(400). send({ msg: "Bad request" });
    } else {
        next(err);
    }
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handleInternalErrors = (err, req, res, next) => {
    console.log(err);
}