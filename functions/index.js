// 'use strict';

const functions = require('firebase-functions');
const express = require('express');
const authenticateUser = require('./authenticateUser.js');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();

app.use(cors);
app.use(cookieParser);
app.use(authenticateUser.validateFirebaseIdToken);

app.get('/darksky/:lat/:lng', (request, response) => {
  const key = process.env.REACT_APP_ROOMIPRO_DARKSKY_APIKEY
  // const key = '673574c9414311415da51f17f18ebc0a'
  // const key = functions.config().darksky.key
  const {lat, lng} = request.params
  // fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${key}/${lat},${lng}`)
  fetch(`https://api.darksky.net/forecast/${key}/${lat},${lng}`)
    .then(res => res.json())
    .then(data => {
      response.send(JSON.stringify(data.daily))
      return;
    })
    .catch(error => {
      response.send(JSON.stringify(error));
    })
});

exports.app = functions.https.onRequest(app);
