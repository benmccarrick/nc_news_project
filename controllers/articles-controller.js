const {getArticleId, allArticles, alterArticle} = require('../models/articles-model')
const {checkExists} = require('./utils-functions')

exports.getArticleById = (req, res, next) => {
    const articleId = req.params.article_id;

    getArticleId(articleId).then((article) => {
       res.status(200).send({article});
    }).catch((err) => {
        next(err);
    });
}

exports.getArticles = (req, res, next) => {
    const {topic, sort_by, order_by} = req.query;

    if(topic){

    return Promise.all([checkExists("articles", "topic", topic), allArticles(topic, sort_by, order_by)])
        .then((promiseResolutions) => {
            res.status(200).send({articles: promiseResolutions[1]});
        }).catch((err) => {
            next(err);
        });
    }
    else { 
        allArticles(topic, sort_by, order_by)
        .then((articles) => {
           res.status(200).send({articles});
        }).catch((err) => {
            next(err);
        });

    }
}

exports.updateArticles = (req, res, next) => {
    const incVotes = req.body.inc_votes;
    const articleId = req.params.article_id;
    
    alterArticle(incVotes, articleId).then((article) => {
       res.status(200).send({article});
    }).catch((err) => {
        next(err);
    });
}

