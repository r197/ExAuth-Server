'use strict';

const Exam = require('../models/exam');
const Chip = require('../models/chip');
const Student = require('../models/student');

exports.exam_create = (req, res, next) => {
  let exam = new Exam(
    {
      name: req.body.name,
      chips: [],
      isOpen: false
    }
  );
  exam.save((err, exam) => {
    if (err) return next(err);
    res.send(exam._id);
  });
}

exports.exam_toggle = (req, res, next) => {
  Exam.findById(req.body.exam_id, (err, exam) => {
    if (err) return next(err);
    exam.isOpen = !exam.isOpen;
    Exam.findByIdAndUpdate(req.body.exam_id, exam, (err) => {
      if (err) return next(err);
      res.send({status: exam.isOpen});
    });
  });
}

exports.exam_add_chip = (req, res, next) => {
  let chip_id = req.body.chip_id;
  let chip = new Chip ({
    _id: chip_id,
    valid: false
  })
  chip.save((err) => {
    if (err) {
      res.send({valid: false, message: "Error adding chip"});
    }
    console.log(req.body.exam_id)
    Exam.findByIdAndUpdate(req.body.exam_id,
      {$push: {chips: chip_id}}, (err, exam) => {
        if (err) {
          res.send({valid: false, message: "Error adding chip"});
        }
        if (exam) {
          res.send({valid: true, message: "Successfully added chip to exam"});
        } else {
          res.send({valid: false, message: "Exam was not found"});
        }
      });
  });
};

exports.exam_open =(req, res, next) => {
  Exam.find({isOpen: true}, (err, exams) => {
    if (err) return next(err);
    console.log(exams);
    res.send({exams: exams});
  });
};

exports.exam_all =(req, res, next) => {
  Exam.find({}, (err, exams) => {
    if (err) return next(err);
    console.log(exams);
    res.send({exams: exams});
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
          if (chip.valid) {
            Student.findById(chip.student_id, (err, student) => {
              res.send({valid: true, student_id: chip.student_id, student_name: student.name});
            })
          } else {
            res.send({valid: false, message: "Student was not authenticated"});
          }
        });
      } else {
        res.send({valid: false, message: "The chip is not part of the selected exam"});
      }
    } else {
      res.send({valid: false, message: "The exam does not exist"});
    }
  });
};
