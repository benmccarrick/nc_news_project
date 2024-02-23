const db = require("../db/connection");

exports.getArticleId = (articleId) => {

    return db.query(`SELECT articles.*, CAST(COUNT(comment_id) AS INT) AS comment_count 
    FROM articles 
    LEFT JOIN comments ON comments.article_id = articles.article_id 
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`, [articleId])
    .then(({rows}) => { 
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
          };
        return rows[0];
    })
}

exports.allArticles = (topic, sort_by="created_at", order_by="DESC") => {

    const validSortBy = ["created_at", "title", "topic", "author", "votes", "comment_count"]
    const validOrderBy = ["DESC", "ASC"]

    if(!validSortBy.includes(sort_by) || !validOrderBy.includes(order_by)){
        return Promise.reject({status: 400, msg: "Bad request"})
    }

    let sqlString = `SELECT articles.article_id, articles.title, 
    articles.topic, articles.author, articles.created_at, 
    articles.votes, articles.article_img_url, CAST(COUNT(comment_id) AS INT)
    AS comment_count
    FROM articles
    LEFT JOIN comments ON comments.article_id = articles.article_id`
    const queryVals = [];

    if(topic){
        sqlString += ` WHERE articles.topic=$1`
        queryVals.push(topic)
    }
    
    sqlString += ` GROUP BY articles.article_id
    ORDER BY ${sort_by} ${order_by};`

    return db.query(sqlString, queryVals)
    .then(({rows}) => {
        return rows;
    })
}

exports.alterArticle = (incVotes, articleId) => {
    
    if(!incVotes){
        return db.query(`SELECT * FROM articles WHERE article_id = $1;`, [articleId])
        .then(({rows}) => {
            return rows[0];
        })
    }

    return db.query(`UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [incVotes, articleId])
    .then(({rows}) => {
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
          };
        return rows[0];
    })
}

exports.newArticle = (author, title, body, topic, article_img_url = "https://defaulturl.com") =>  {
    return db
      .query(
        `
      INSERT INTO articles (author, title, body, topic, article_img_url) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
      `,
        [author, title, body, topic, article_img_url]
      )
      .then(({ rows }) => {
        console.log(rows[0])
        return rows[0];
      });
  }