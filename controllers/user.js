'use strict';

const User = require('../models/user');
const FaceAPI = require('./faceAPI');

exports.verify_user = (req, res, next) => {
  const user_id = req.body.userId;
  const chip_id = req.body.chipId;
  const photo = req.body.photo;
  User.findById(user_id, (err, user) => {
    if (err) return next(err);
    if (user) {
      FaceAPI.verifyFace(user.photo, photo, res, chip_id)
    } else {
      res.send(false);
    }
  });
};
