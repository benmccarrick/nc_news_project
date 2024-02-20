const {getArticleId, allArticles} = require('../models/articles-model')

exports.getArticleById = (req, res, next) => {
    const articleId = req.params.article_id

    getArticleId(articleId).then((article) => {
       res.status(200).send({article});
    }).catch((err) => {
        next(err);
    });
}

exports.getArticles = (req, res, next) => {
    const {sort_by, order_by} = req.query

    allArticles(sort_by, order_by).then((articles) => {
       res.status(200).send({articles});
    }).catch((err) => {
        next(err);
    });
}

