const { Router } = require('express');
const controller = require('./controller');
const soapController = require('./soapController');
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');

const router = Router();

// router.get('/', () => { controller.getUsers(); });

router.post('/login', controller.login);
router.get('/getUsers', authenticateToken, controller.getUsers);
router.get('/getUser/:userid', authenticateToken, controller.getUserById);
router.get('/getSongs/:userid', authenticateToken, controller.getSongsFromUsers);
router.post('/addUser', authenticateToken, controller.addUser);

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