'use strict';

const express = require('express');
const router = new express.Router();
const user_controller = require('../controllers/student');

router.post('/verify', user_controller.upload_photo, user_controller.verify_student);
router.get('', user_controller.student_exists);

module.exports = router;
