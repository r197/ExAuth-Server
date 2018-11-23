'use strict';

const request = require('request');
const chip_controller = require('controllers/chip');

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
      let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
      console.log('JSON Response\n');
      console.log(jsonResponse);

      resolve(body.faceId);
    })
  });
}

const sendVerifyRequest = (faceIds) => {
  let body = {'faceId1': faceIds[0], 'faceId2': faceIds[1]};
  let options = {
    uri: uriBaseVerify,
    qs: params,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };
  return request.post(options);
}

const verifyFace = (image1, image2, res, chip_id) => {
  let promise1 = detectFaceFromImage(image1);
  let promise2 = detectFaceFromImage(image2);
  Promise.all([promise1, promise2]).then((faceIds) => {
    if (faceIds[0] && faceIds[1]) {
      let results = sendVerifyRequest(faceIds);
      results.then((error, response, body) => {
        if (error) {
          res.send(false);
        } else {
          chip_controller.exam_update_chip(res, chip_id, body.isIdentical)
        }
        // let jsonResponse = JSON.stringify(JSON.parse(body), null, '  ');
        // console.log('JSON Response\n');
        // console.log(jsonResponse);
      })
    } else {
      res.send(false)
    }
  });
}

module.exports = {
  verifyFace: verifyFace,
};
