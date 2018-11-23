'use strict';

const Exam = require('../models/exam');
const Chip = require('../models/chip');

exports.exam_create = (req, res, next) => {
  let exam = new Exam(
    {
      name: req.body.name,
      chips: [],
    }
  );
  exam.save((err) => {
    if (err) return next(err);
    res.send("Successfully created exam");
  });
}

exports.exam_add_chip = (req, res, next) => {
  let chip_id = req.body.chip_id;
  let chip = new Chip ({
    _id: chip_id,
    valid: false
  })
  chip.save((err) => {
    if (err) return next(err);
    Exam.findByIdAndUpdate(req.body.exam_id,
      {$push: {chips: chip_id}}, (err, exam) => {
        if (err) return next(err);
        if (exam) {
          res.send("Successfully added chip to exam");
        } else {
          res.send("Exam was not found");
        }
      });
  });
};

exports.exam_all =(req, res, next) => {
  Exam.find({}, (err, exams) => {
    if (err) return next(err);
    res.send(exams);
  });
};

exports.exam_check_chip =(req, res, next) => {
  let chip_id = req.query.chip_id;
  Exam.findById(req.query.exam_id, (err, exam) => {
    if (err) return next(err);
    if (exam) {
      if (exam.chips.indexOf(chip_id) > -1) {
        Chip.findById(chip_id, (err, chip) => {
          if (err) return next(err);
          res.send({valid: chip.valid});
        });
      } else {
        res.send({valid: false, message: "The chip is not part of the selected exam"});
      }
      res.send(Response.createSuccessfulResponse(user));
    } else {
      res.send({valid: false, message: "The exam does not exist"});
    }
  });
};
