const db = require("../db/connection");

exports.getComments = (articleId, sort_by="created_at", order_by="ASC") => {

    const validSortBy = ["created_at", "body", "author", "votes", "article_id"]
    const validOrderBy = ["DESC", "ASC"]

    if(!validSortBy.includes(sort_by) || !validOrderBy.includes(order_by)){
        return Promise.reject({status: 400, msg: "Bad request"})
    }

    return db.query(`SELECT * FROM comments WHERE article_id = $1 ORDER BY ${sort_by} ${order_by};`, [articleId])
    .then(({rows}) => { 
        if(rows.length === 0) {
            return Promise.reject({status: 404, msg: 'article does not exist'})
          };
        return rows;
    })
}

exports.addComments = (body, author, articleId) =>  {
    return db
      .query(
        `
      INSERT INTO comments (body, author, article_id) 
      VALUES ($1, $2, $3)
      RETURNING *;
      `,
        [body, author, articleId]
      )
      .then(({ rows }) => {
        
        return rows[0];
      });
  }

  exports.deleteComments = (commentId) =>  {
    return db.query(`
      DELETE FROM comments 
      WHERE comment_id = $1
      RETURNING *;`,[commentId]
      );
  }

  exports.updateComments = (incVotes, commentId) =>  {
    if(!incVotes){
      return db.query(`SELECT * FROM comments WHERE comment_id = $1;`, [commentId])
      .then(({rows}) => {
          return rows[0];
      })
  }

  return db.query(`UPDATE comments
  SET votes = votes + $1
  WHERE comment_id = $2
  RETURNING *;`, [incVotes, commentId])
  .then(({rows}) => {
      if(rows.length === 0) {
          return Promise.reject({status: 404, msg: 'comment does not exist'})
        };
      return rows[0];
  })
  }