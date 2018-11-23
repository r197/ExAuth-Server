'use strict';

const Photo = require('../models/photo');

exports.save_photo = (req, res, next) => {
  console.log(req)
  let photo = new Photo(
    {
      photo: req.body,
    }
  );
  photo.save((err, savedPhoto) => {
    if (err) return next(err);
    res.send(savedPhoto._id);
  });
};
