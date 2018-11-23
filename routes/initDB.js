'use strict';

const express = require('express');
const router = new express.Router();
const initDB_controller = require('../controllers/initDB');

router.get('', initDB_controller.init_db);

module.exports = router;
