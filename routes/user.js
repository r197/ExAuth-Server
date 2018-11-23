'use strict';

const express = require('express');
const router = new express.Router();
const user_controller = require('../controllers/user');

router.get('/verify', user_controller.verify_user);
router.get('', user_controller.user_exists);

module.exports = router;
