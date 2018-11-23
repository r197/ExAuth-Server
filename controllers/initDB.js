'use strict'

const fs = require('fs');
const User = require('../models/user');

exports.init_db = (req, res, next) => {
  {
    const saveStudent2 = () => {
      fs.readFile("photos/student2_pic1.jpg", function (err, file) {
        if (err) {
          throw err;
        }
        let user = new User(
          {
            _id: '17862948',
            name: 'Ron Weasley',
            photo: file,
          }
        );
        user.save((err) => {
          if (err) return next(err);
          res.send("Initialized Database");
        });
      })
    }

    fs.readFile("photos/student1_pic1.jpg", function (err, file) {
      if (err) {
        throw err;
      }
      let user = new User(
        {
          _id: '78261748',
          name: 'Harry Potter',
          photo: file,
        }
      );
      user.save((err) => {
        if (err) return next(err);
        saveStudent2();
      });
    })
  }
}
