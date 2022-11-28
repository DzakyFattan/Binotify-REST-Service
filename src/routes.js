const { Router } = require('express');
const userController = require('./userController');
const songController = require('./songController');
const soapController = require('./soapController');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');
const queries = require('./queries');
const pool = require('./db');
const soap = require('./soapRequest');

const router = Router();

// router.get('/', () => { controller.getUsers(); });

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/getUsers', authenticateToken, userController.getUsers);

router.get('/getSongs', authenticateToken, songController.getSongs);
router.post('/addSong', authenticateToken, songController.addSong);
router.post('/updateSong', authenticateToken, songController.updateSong);
router.post('/removeSong', authenticateToken, songController.removeSong);

// SOAP
router.post('/getSubRequests', authenticateToken, soapController.getSubRequests);
router.post('/updateSub', authenticateToken, soapController.updateSub);
router.post('/getPremiumSongs', authenticateToken, soapController.getPremiumSongs);

// implement authentication middleware here for now
async function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    // if admin, then next()
    try {
        if (token == config.admin_token) {
            req.user = config.admin_token;
            req.apikey = config.RESTAPIKey;
            next();
        } else if (token == null) {
            return res.status(401).json({ message: 'Unauthorized' });
        } else {
            let username = jwt.verify(token, config.access_token_secret);
            let id_user = await pool.query(queries.getUserByUsername, [username.name]);
            if (id_user.rows.length > 0) {
                req.user = username.name;
                req.user_id = id_user.rows[0].id_user;
                if (id_user.rows[0].isadmin) {
                    req.apikey = config.RESTAPIKey;
                } else {
                    const getkey = await soap.APIKeyRequest('getAPIKey', { 'arg0': id_user.rows[0].id_user });
                    req.apikey = getkey.content.value;
                };
                next();
            } else {
                return res.status(401).json({ message: 'Unauthorized' });
            };
        };
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
};

module.exports = router;