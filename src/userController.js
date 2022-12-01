const pool = require('./db');
const queries = require('./queries');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');
const crypto = require('crypto-js');
const soap = require('./soapRequest');

const login = async (req, res) => {
    // Auth user
    try {
        const { username, password } = req.body;
        let id_user = await pool.query(queries.getUserByUsername, [username]);
        if (id_user.rows.length > 0) {
            const pass_user = crypto.AES.decrypt(id_user.rows[0].pass_user, config.aes_key).toString(crypto.enc.Utf8);
            if (pass_user == password) {
                if (id_user.rows[0].isadmin == true) {
                    const accessToken = jwt.sign({ name: username }, config.access_token_secret);
                    res.status(200).json({
                        message: 'Login Successful',
                        accessToken: accessToken,
                        isAdmin: true
                    });
                } else {
                    const accessToken = jwt.sign({ name: username }, config.access_token_secret);
                    let getkey = await soap.APIKeyRequest('getAPIKey', { 'arg0': id_user.rows[0].id_user });
                    res.status(200).json({
                        message: 'Login Successful',
                        accessToken: accessToken,
                        apiKey: getkey.content.value,
                        isAdmin: false
                    });
                }
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
    try {
        const { email, password, username, name_user } = req.body;
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
                let id_user = await pool.query(queries.getUserByUsername, [username]);
                let response = await soap.APIKeyRequest('addAPIKey', { 'arg0': id_user.rows[0].id_user });
                // console.log(response);
                if (response.status == '401') {
                    res.status(401).json({ message: 'Unauthorized' });
                } else if (response.status == '200') {
                    res.status(201).json({
                        message: 'User added Successfully',
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
        let fetched = await pool.query(queries.getUsersWithoutAdmin)
        const users = fetched.rows.map(user => {
            return {
                id_user: user.id_user,
                email: user.email,
                username: user.username,
                name_user: user.name_user,
                isadmin: user.isadmin
            }
        });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    login,
    register,
    getUsers,
};