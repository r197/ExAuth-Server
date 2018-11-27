'use strict';

const request = require('request');
const chip_controller = require('./chip');

const subscriptionKey = 'a73967987a1741d2977359beea6a1059';
const uriBaseDetect = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
const uriBaseVerify = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/verify';

const detectFaceFromImage = (image) => {
  const params = {
    'returnFaceId': true
  };
  const options = {
    uri: uriBaseDetect,
    qs: params,
    body: image,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };
  return new Promise((resolve, reject) => {
    request.post(options, (error, response, body) => {
      if (error) {
        console.log(error)
        return reject(error);
      }
      let jsonObj = JSON.parse(body);
      console.log(jsonObj[0].faceId);
      resolve(jsonObj[0].faceId);
    })
  });
}

const sendVerifyRequest = (faceIds, callback) => {
  let body = {'faceId1': faceIds[0], 'faceId2': faceIds[1]};
  let options = {
    uri: uriBaseVerify,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };
  return request.post(options, callback);
}

const verifyFace = (image1, image2, res, chip_id, student_id) => {
  let promise1 = detectFaceFromImage(image1);
  let promise2 = detectFaceFromImage(image2);
  Promise.all([promise1, promise2]).then((faceIds) => {
    console.log(faceIds);
    if (faceIds[0] && faceIds[1]) {
      let callback = (error, response, body) => {
        if (error) {
          console.log("end1");
          res.send(false);
        } else {
          let jsonObj = JSON.parse(body);

          console.log("verify student:")
          console.log(jsonObj.isIdentical)

          fs.unlink(`./temp_images/${student_id}.jpg`, (err) => {
            if (err) return next(err);
          });
          chip_controller.exam_update_chip(res, chip_id, student_id, jsonObj.isIdentical)
        }
      }
      sendVerifyRequest(faceIds, callback);

    } else {
      console.log("end2");
      res.send(false)
    }
  });
}

module.exports = {
  verifyFace: verifyFace,
};
