const pool = require('./db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');
const crypto = require('crypto-js');
const soap = require('./soapRequest');

const login = async (req, res) => {
    // Auth user
    const user = { name: req.body.username };
    try {
        let id_user = await pool.query(queries.getUserByUsername, [req.body.username]);
        if (id_user.rows.length > 0) {
            const pass_user = crypto.AES.decrypt(id_user.rows[0].pass_user, config.aes_key).toString(crypto.enc.Utf8);
            if (pass_user == req.body.password) {
                const accessToken = jwt.sign(user, config.access_token_secret);
                let getkey = await soap.APIKeyRequest('getAPIKey', { 'arg0': id_user.rows[0].id_user });
                res.status(201).json({
                    message: 'Login Successful',
                    accessToken: accessToken,
                    apiKey: getkey.content.value
                });
            } else {
                res.status(401).json({ message: 'Incorrect username or password' });
            }
        } else {
            res.status(404).json({ message: 'User does not exist' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const register = async (req, res) => {
    // // console.log('adding a user..');
    const { email, password, username, name_user } = req.body;
    try {
        let checkEmailExists = await pool.query(queries.checkEmailExists, [email]);
        if (checkEmailExists.rows.length > 0) {
            res.status(409).json({ message: 'Email already exists' });
        } else {
            let checkUsernameExists = await pool.query(queries.checkUsernameExists, [username]);
            if (checkUsernameExists.rows.length > 0) {
                res.status(409).json({ message: 'Username already exists' });
            } else {
                const pass_user = crypto.AES.encrypt(password, config.aes_key).toString();
                let _ = await pool.query(queries.addUser, [email, pass_user, username, name_user]);
                const accessToken = jwt.sign({ name: username }, config.access_token_secret);
                let id_user = await pool.query(queries.getUserByUsername, [username]);
                let response = await soap.APIKeyRequest('addAPIKey', { 'arg0': id_user.rows[0].id_user });
                // console.log(response);
                if (response.status == '401') {
                    res.status(401).json({ message: 'Unauthorized' });
                } else if (response.status == '200') {
                    let getkey = await soap.APIKeyRequest('getAPIKey', { 'arg0': id_user.rows[0].id_user });
                    res.status(201).json({
                        message: 'User added Successfully',
                        accessToken: accessToken,
                        apiKey: getkey.content.value
                    });
                } else if (response.status == '500') {
                    res.status(500).json({ message: 'Internal server error' });
                }
            }
        }
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