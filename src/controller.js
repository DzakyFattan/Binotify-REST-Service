const pool = require('../db');
const queries = require('./queries');

const getUsers = async (req, res) => {
    // console.log('querying users..');
    pool.query(queries.getUsers, (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const getUserById = async (req, res) => {
    // console.log('querying a user...');
    const id_user = parseInt(req.params.userid); 
    pool.query(queries.getUserById, [id_user], (error, results) => {
        if (error) {
            throw error;
        }
        res.status(200).json(results.rows);
    });
};

const addUser = async (req, res) => {
    // // console.log('adding a user..');
    const {email, pass_user, username, name_user, isadmin} = req.body;
    pool.query(queries.checkEmailExists, [email], (error, results) => {
        if (error) {
            throw error;
        }
        if (results.rows.length > 0) {
            res.status(400).json({message: 'Email already exists'});
        } else {
            pool.query(queries.addUser, [email, pass_user, username, name_user, isadmin], (error, results) => {
                if (error) {
                    throw error;
                }
                res.status(201).json({message: 'User added successfully'});
            });
        }
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
};