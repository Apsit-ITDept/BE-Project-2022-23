const express = require('express');
const router = express.Router();

// Controllers
const { login, register, dashboard } = require('../controllers/signup');
const { verifyEmail } = require('../controllers/verifyEmail');

// Middlewares
const authMiddleware = require('../middlewares/auth');

router.route('/login').post(login);
router.route('/register').post(register);
router.route('/user/verify/:id/:token').get(verifyEmail);
router.route('/dashboard').get(authMiddleware, dashboard);

module.exports = router;