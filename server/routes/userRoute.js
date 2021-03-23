const express = require('express');
const { body } = require('express-validator');

const authController = require('../controller/authController');

const router = express.Router();

router.post(
	'/signup',
	body('firstname').isString().isLength({ min: 3 }),
	body('lastname').isString().isLength({ min: 3 }),
	body('email').isEmail().normalizeEmail(),
	body('password').isLength({ min: 8 }),
	authController.signup
);

router.post(
	'/login',
	body('email').isEmail().normalizeEmail(),
	body('password').isLength({ min: 8 }),
	authController.signin
);
module.exports = router;
