const pool = require('./db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');

const login = (req, res) => {
    // Auth user
    const username = req.body.username;
    const user = { name: username };
    const accessToken = jwt.sign(user, config.access_token_secret);
    res.status(200).json({accessToken: accessToken});
};

const getUsers = async (req, res) => {
    // console.log('querying users..');
    try {
        pool.query(queries.getUsers, (error, results) => {
            res.status(200).json(results.rows);
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const getUserById = async (req, res) => {
    // console.log('querying a user...');
    const id_user = parseInt(req.params.userid); 
    try {
        pool.query(queries.getUserById, [id_user], (error, results) => {
            res.status(200).json(results.rows);
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

const addUser = async (req, res) => {
    // // console.log('adding a user..');
    const {email, pass_user, username, name_user, isadmin} = req.body;
    try {
        pool.query(queries.checkEmailExists, [email], (error, results) => {
            if (results.rows.length > 0) {
                res.status(409).json({message: 'Email already exists'});
            } else {
                pool.query(queries.addUser, [email, pass_user, username, name_user, isadmin], (error, results) => {
                    res.status(201).json({message: 'User added'});
                });
            }
        });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

module.exports = {
    login,
    getUsers,
    getUserById,
    addUser,
};