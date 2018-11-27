'use strict';

const fs = require('fs');
const Student = require('../models/student');
const Exam = require('../models/exam');
const FaceAPI = require('./faceAPI');
const multer = require('multer');

const upload = multer()

exports.upload_photo = upload.single('upload')

exports.verify_student = (req, res, next) => {
  const student_id = req.body.studentId;
  const chip_id = req.body.chipId;
  const exam_id = req.body.examId;
  const file = req.file.buffer;

  Exam.findById(exam_id, (err, exam) => {
    if (err) return next(err);
    if (exam) {
      if (exam.isOpen) {
        fs.readFile(`./student_images/${student_id}.jpg`, function (err, saved_photo) {
          if (err) return next(err);
          FaceAPI.verifyFace(saved_photo, file, res, chip_id, student_id)
        });
      } else {
        res.send({valid: false, message: "Exam is closed"})
      }
    } else {
      res.send({valid: false, message: "Exam not found"})
    }
  })
};

exports.student_exists =(req, res, next) => {
  Student.findById(req.query.id, (err, student) => {
    if (err) return next(err);
    if (student) {
      res.send(true);
    } else {
      res.send(false);
    }
  });
};
