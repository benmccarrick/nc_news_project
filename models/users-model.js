const db = require("../db/connection");

exports.allUsers = () => {

    return db.query(`SELECT * FROM users;`)
    .then(({rows}) => { 
        return rows;
    })
}

exports.getUsername = (username) => {

    return db.query(`SELECT * FROM users WHERE users.username = $1;`, [username])
    .then(({rows}) => { 
        return rows[0];
    })
}