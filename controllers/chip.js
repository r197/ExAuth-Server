'use strict';

const Chip = require('../models/chip');

exports.exam_update_chip = (chip_id) => {
  Chip.findByIdAndUpdate(chip_id, {valid: true}, (err) => {
    console.log(err);
  });
}
