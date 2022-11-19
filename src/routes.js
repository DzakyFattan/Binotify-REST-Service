const { Router } = require('express');
const controller = require('./controller');
const router = Router();

// router.get('/', () => { controller.getUsers(); });
router.get('/', controller.getUsers);
router.get('/:userid', controller.getUserById);
router.post('/', controller.addUser);

module.exports = router;