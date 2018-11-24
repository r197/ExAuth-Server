'use strict';

const Chip = require('../models/chip');

exports.exam_update_chip = (res, chip_id, student_id, valid) => {
  if (valid) {
    Chip.findByIdAndUpdate(chip_id, {valid: valid, student_id: student_id}, (err) => {
      if (err) {
        console.log(err);
        res.send(false);
      } else {
        res.send(true);
      }
    });
  } else {
    res.send(false);
  }
}
