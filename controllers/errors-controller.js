exports.handleInvalidEndpoints = (req, res, next) => {
    res.status(404).send({msg: "Path not found"});
    next(err);
}

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ msg: "Bad request" });
    }
    if (err.code === "23503"){
        res.status(404).send({ msg: "Not found" });
    }
    
        next(err);
};

exports.handleCustomErrors = (err, req, res, next) => {
    if(err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else {
        next(err);
    }
};

exports.handleInternalErrors = (err, req, res, next) => {
    if(err){
    res.status(500).send("Internal server error");
    }
}