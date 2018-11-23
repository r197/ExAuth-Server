'use strict';

const User = require('../models/user');
const Photo = require('../models/photo');
const FaceAPI = require('./faceAPI');

exports.verify_user = (req, res, next) => {
  const user_id = req.query.userId;
  const photo_id = req.query.photoId;
  console.log(user_id)
  console.log(photo_id)
  User.findById(user_id, (err, user) => {
    if (err) return next(err);
    if (user) {
      Photo.findById(photo_id, (err, photo) => {
        if (err) return next(err);
        FaceAPI.verifyFace(user.photo, photo.photo, res)
      })
    } else {
      console.log("HERE")
      res.send(false);
    }
  });
};
