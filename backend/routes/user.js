const express = require('express');
const router  = express.Router();

const UsersController = require('../controllers/UsersController');
const auth            = require('../middlewares/auth');

router.post  ('/signup',  UsersController.signup);
router.post  ('/login',   UsersController.login);
router.all   ('*',        auth.index);

router.post  ('/',        UsersController.create);
router.get   ('/',        UsersController.list);
router.get   ('/:id',     UsersController.show);
router.put   ('/:id',     UsersController.update);
router.delete('/:id',     UsersController.destroy);

module.exports = router;