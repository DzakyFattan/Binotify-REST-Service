const pool = require('./db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');
const crypto = require('crypto-js');

const login = (req, res) => {
    // Auth user
    const username = req.body.username;
    const user = { name: username };
    try {
        pool.query(queries.getUserByUsername, [username], (error, results) => {
            if (error) {
                throw error;
            }
            if (results.rows.length > 0) {
                // console.log(results.rows);
                const pass_user = crypto.AES.decrypt(results.rows[0].pass_user, config.aes_key).toString(crypto.enc.Utf8);
                if (pass_user == req.body.password) {
                    const accessToken = jwt.sign(user, config.access_token_secret);
                    res.status(200).json({
                        message: 'Login successful',
                        accessToken: accessToken
                    });
                } else {
                    res.status(401).json({ message: 'Incorrect password' });
                }
            } else {
                res.status(404).json({ message: 'User does not exist' });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    
};

const register = async (req, res) => {
    // // console.log('adding a user..');
    const { email, password, username, name_user } = req.body;
    try {
        pool.query(queries.checkEmailExists, [email], (error, results) => {
            if (results.rows.length > 0) {
                res.status(409).json({ message: 'Email already exists' });
            } else {
                pool.query(queries.checkUsernameExists, [username], (error, results) => {
                    if (results.rows.length > 0 || username == 'admin') {
                        res.status(409).json({ message: 'Username already exists' });
                    } else {
                        pool.query(queries.addUser, [email, crypto.AES.encrypt(password, config.aes_key).toString(), username, name_user, false], (error, results) => {
                            if (error) {
                                throw error;
                            }
                            const accessToken = jwt.sign({ name: username }, config.access_token_secret);
                            res.status(201).json({
                                message: 'User added',
                                accessToken: accessToken
                            });
                        });
                    }
                });
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    // console.log('querying users..');
    try {
        pool.query(queries.getUsers, (error, results) => {
            if (error) {
                throw error;
            }
            res.status(200).json(results.rows);
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    register,
    getUsers,
};