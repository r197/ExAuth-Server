'use strict';

const fs = require('fs');
const Student = require('../models/student');
const FaceAPI = require('./faceAPI');
const multer = require('multer');

exports.verify_student = (req, res, next) => {
  const student_id = req.body.studentId;
  const chip_id = req.body.chipId;

  console.log(req.body);
  console.log(req.query);

  console.log(student_id);
  console.log(chip_id);

  upload(req, res, function(err) {
    if (err) next(err);
    fs.readFile(`./temp_images/${student_id}.jpg`, function (err, file) {
      if (err) next(err);
      fs.readFile(`./student_images/${student_id}.jpg`, function (err, saved_photo) {
          if (err) return next(err);
          FaceAPI.verifyFace(saved_photo, file, res, chip_id, student_id)
      });
    })
  });
};

const Storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, "./temp_images");
  },

  filename: function(req, file, callback) {
    console.log(file.originalname);
    callback(null, file.originalname);
  }
});

const upload = multer({
  storage: Storage
}).array("upload", 3);


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
