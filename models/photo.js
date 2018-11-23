'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PhotoSchema = new Schema({
  photo: {type: Buffer, required: true},
});

module.exports = mongoose.model('Photo', PhotoSchema);
