const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// User Registration
router.post('/register', userController.createUser);

// User Login
router.post('/login', userController.loginUser);

module.exports = router;
