const { Router } = require('express');
const controller = require('./controller');
const router = Router();
const jwt = require('jsonwebtoken');
const config = require('./config/default.js');

// router.get('/', () => { controller.getUsers(); });

router.get('/getUsers', authenticateToken, controller.getUsers);
router.get('/getUser/:userid', authenticateToken, controller.getUserById);
router.post('/addUser', authenticateToken, controller.addUser);
router.post('/login', controller.login);

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