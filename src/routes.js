const { Router } = require('express');
const userController = require('./userController');
const songController = require('./songController');
const soapController = require('./soapController');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');

const router = Router();

// router.get('/', () => { controller.getUsers(); });

router.post('/login', userController.login);
router.get('/getUsers', authenticateToken, userController.getUsers);
router.post('/register', userController.register);

router.get('/getSongs/', authenticateToken, songController.getSongs);
router.post('/addSong', authenticateToken, songController.addSong);
router.post('/updateSong', authenticateToken, songController.updateSong);
router.post('/removeSong', authenticateToken, songController.removeSong);

// SOAP
router.post('/getSubRequests', authenticateToken, soapController.getSubRequests);
router.post('/updateSub', authenticateToken, soapController.updateSub);
router.post('/getPremiumSongs', authenticateToken, soapController.getPremiumSongs);

// implement authentication middleware here for now
function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    // if admin, then next()
    if (token == config.admin_token) {
        req.user = 'admin';
        next();
    } else if (token == null) {
        return res.status(401).json({ message: 'Unauthorized' });
    } else {
        jwt.verify(token, config.access_token_secret, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden' });
            }
            req.user = user;
            console.log(user);
            next();
        });
    }
};

module.exports = router;