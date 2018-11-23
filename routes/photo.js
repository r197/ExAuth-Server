'use strict';

const express = require('express');
const router = new express.Router();
const photo_controller = require('../controllers/photo');

router.post('/save', photo_controller.save_photo);

module.exports = router;
