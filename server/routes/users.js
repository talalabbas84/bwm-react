const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

router.get('/auth', User.auth);

router.get('/register', User.register);

module.exports = router;
