const {allTopics} = require('../models/topics-model')

exports.getTopics = (req, res, next) => {

    allTopics().then((topics) => {
       res.status(200).send({topics});
    }).catch((err) => {
        next(err);
    });
}

