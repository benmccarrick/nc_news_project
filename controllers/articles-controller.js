const {getArticleId, allArticles, alterArticle, newArticle} = require('../models/articles-model')
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
    const promises = [allArticles(topic, sort_by, order_by)]

    if(topic){
        promises.push(checkExists("topics", "slug", topic))
    }

    return Promise.all(promises)
    .then((promiseResolutions) => {
        res.status(200).send({articles: promiseResolutions[0]});
    }).catch((err) => {
        next(err);
    });
    
    
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

exports.addArticles = (req, res, next) => {
    const {author, title, body, topic, article_img_url} = req.body;
    
   return newArticle(author, title, body, topic, article_img_url)
    .then(({article_id}) => {
      return getArticleId(article_id);
    })
    .then((article) => {
        res.status(201).send({article});
    })
    .catch((err) => {
        next(err);
    });
}
