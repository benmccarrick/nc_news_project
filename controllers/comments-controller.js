const {getComments, addComments} = require('../models/comments-model');
const { getArticleId } = require('../models/articles-model');

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
    return getArticleId(articleId)
    .then(() => {
        return addComments(body, username, articleId)
    })
    .then((comments) => {

       res.status(201).send({comments});
    }).catch((err) => {
        next(err);
    });
}