const {allTopics, newTopic} = require('../models/topics-model')

exports.getTopics = (req, res, next) => {

    allTopics().then((topics) => {
       res.status(200).send({topics});
    }).catch((err) => {
        next(err);
    });
}

exports.addTopics = (req, res, next) => {
    const {slug, description} = req.body;
    
   return newTopic(slug, description)
    .then((topic) => {
        res.status(201).send({topic});
    })
    .catch((err) => {
        next(err);
    });
}

