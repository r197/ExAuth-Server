'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  _id: {type: String, required: true},
  name: {type: String, required: true},
  photo: {type: Buffer, required: true},
});

module.exports = mongoose.model('User', UserSchema);
