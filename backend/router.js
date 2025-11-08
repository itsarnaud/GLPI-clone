const express = require('express');
const router  = express.Router();

// Route import
const user = require('./routes/user');

router.use('/user', user);

module.exports = router;