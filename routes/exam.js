'use strict';

const express = require('express');
const router = new express.Router();
const exam_controller = require('../controllers/exam');

router.post('/create', exam_controller.exam_create);
router.put('/addChip', exam_controller.exam_add_chip);
router.get('/allExams', exam_controller.exam_all);
router.get('/checkChip', exam_controller.exam_check_chip);

module.exports = router;
