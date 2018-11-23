'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChipSchema = new Schema({
  _id: {type: String, required: true},
  valid: {type: Boolean, required: true},
});

module.exports = mongoose.model('Chip', ChipSchema);
