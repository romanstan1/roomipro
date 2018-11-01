// 'use strict';

const functions = require('firebase-functions');
const express = require('express');
const authenticateUser = require('./authenticateUser.js');
const notifications = require('./notifications.js');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();

app.use(cors);
app.use(cookieParser);

app.post('/registerDevice', notifications.registerDevice);

app.use(authenticateUser.validateFirebaseIdToken);

const key = process.env.REACT_APP_ROOMIPRO_DARKSKY_APIKEY
// const key = functions.config().darksky.key
app.get('/darksky/:lat/:lng', (request, response) => {

  const {lat, lng} = request.params
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

app.post('/postNotification', notifications.postNotification);

exports.app = functions.https.onRequest(app);
