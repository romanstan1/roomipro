'use strict';

const functions = require('firebase-functions');
const express = require('express');
const authenticateUser = require('./authenticateUser.js');
const fetch = require('node-fetch');
const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});
const app = express();

const redis = require('redis')
// const client = redis.createClient(null, null, { detect_buffers: true })

app.use(cors);
app.use(cookieParser);
app.use(authenticateUser.validateFirebaseIdToken);

app.get('/darksky/:lat/:lng', (request, response) => {
  const key = process.env.REACT_APP_ROOMIPRO_DARKSKY_APIKEY
  const {lat, lng} = request.params
  console.log(' ');
  console.log('request::: ', request.params);
  console.log(' ');
  // fetch(`https://api.darksky.net/forecast/${key}/${lat},${lng}`)
  //   .then(res => res.json())
  //   .then(data => {
  //     response.send(JSON.stringify(data.daily));
  //   })
  //   .catch(error => {
  //     response.send(JSON.stringify(error));
  //   })

  // client.get(`${lat},${lng}`,(err, weatherData) => {
  //   if (weatherData) {
  //     return response.send(JSON.stringify(data.daily));
  //   }
  //   if (err) {
  //     console.log('error here', err);
  //     return response.send(JSON.stringify(err));
  //   }

    fetch(`https://api.darksky.net/forecast/${key}/${lat},${lng}`)
      .then(res => res.json())
      .then(data => {
        // client.set(`${lat},${lng}`, JSON.stringify(data.daily));
        response.send(JSON.stringify(data.daily))
      })
      .catch(error => {
        response.send(JSON.stringify(error));
      })

  // }).catch(err => {
  //   console.log('error', err);
  // })


});

exports.app = functions.https.onRequest(app);
