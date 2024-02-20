const db = require("../db/connection");

exports.getArticleId = (articleId) => {

    return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
    .then(({rows}) => { 
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
          };
        return rows[0];
    })
}

exports.allArticles = (sort_by="created_at", order_by="DESC") => {

    const validSortBy = ["created_at", "title", "topic", "author", "votes", "comment_count"]
    const validOrderBy = ["DESC", "ASC"]

    if(!validSortBy.includes(sort_by) || !validOrderBy.includes(order_by)){
        return Promise.reject({status: 400, msg: "Bad request"})
    }
    
    return db.query(`SELECT articles.article_id, articles.title, articles.topic, articles.author, articles.created_at, articles.votes, articles.article_img_url, COUNT(comment_id)
    AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id
    GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order_by};`)
    .then(({rows}) => {
        return rows;
    })
}