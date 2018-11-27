'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  name: {type: String, required: true},
  chips: [{type: String}],
  isOpen: {type: Boolean, required: true,}
});

module.exports = mongoose.model('Exam', ExamSchema);
