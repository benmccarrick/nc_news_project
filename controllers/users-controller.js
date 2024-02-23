const {allUsers, getUsername} = require('../models/users-model')
const {checkExists} = require('./utils-functions')

exports.getUsers = (req, res, next) => {

    allUsers().then((users) => {
       res.status(200).send({users});
    }).catch((err) => {
        next(err);
    });
}

exports.getUserByUsername = (req, res, next) => {
    const username = req.params.username;

    const promises = [checkExists("users", "username", username), getUsername(username)]
    
    Promise.all(promises)
    .then((promiseResolutions) => {
        res.status(200).send({user: promiseResolutions[1]});
    }).catch((err) => {
        next(err);
    });
}