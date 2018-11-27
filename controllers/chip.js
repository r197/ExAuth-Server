'use strict';

const Chip = require('../models/chip');

exports.exam_update_chip = (res, chip_id, student_id, valid) => {
  if (valid) {
    Chip.findByIdAndUpdate(chip_id, {valid: valid, student_id: student_id}, (err) => {
      if (err) {
        console.log(err);
        res.send({valid: false, message: "An error has occurred."});
      } else {
        res.send({valid: true});
      }
    });
  } else {
    res.send({valid: false, message: "Face does not match"});
  }
}
