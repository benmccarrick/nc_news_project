const {getComments, addComments} = require('../models/comments-model');
const { getArticleId } = require('../models/articles-model');
const {checkExists} = require('./utils-functions')

exports.getCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id
    const {sort_by, order_by} = req.query

    getComments(articleId, sort_by, order_by).then((comments) => {
       res.status(200).send({comments});
    }).catch((err) => {
        next(err);
    });
}

exports.addCommentsByArticleId = (req, res, next) => {
    const articleId = req.params.article_id;
    const {body, username} = req.body;
    
    return Promise.all([checkExists("articles", "article_id", articleId), addComments(body, username, articleId)
    ])
    .then((promiseResolutions) => {
       res.status(201).send({comments: promiseResolutions[1]});
    }).catch((err) => {
        next(err);
    });
}