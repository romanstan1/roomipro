const fetch = require('node-fetch');
const functions = require('firebase-functions');

// const key = functions.config().server.key
const key = process.env.REACT_APP_ROOMIPRO_SERVER_KEY

const registerDevice = (request, response) => {
  const token = request.body.token
  const topic = request.body.topic
  const url = "https://iid.googleapis.com/iid/v1/" + token + "/rel/topics/" + topic;
  fetch(url,
  {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + key
    }
  })
  .then(resp => resp.json())
  .then((resp) => {
    console.log('response !! : ', resp);
    response.send(JSON.stringify({ success: true, response: resp,  error: false}))
    return;
  })
  .catch(error => {
    console.log('error: ', error);
    response.send(JSON.stringify({ success: false, response: null, error: true}))
    return;
  })
}

const postNotification = (request, response) => {
  const title = request.body.title;
  const body = request.body.body;
  const icon = request.body.icon;
  const link = request.body.link;

  const content = {
    notification: {
      title, body, icon,
      click_action: link
    },
    to : "/topics/roomipro1"
  }

  fetch('https://fcm.googleapis.com/fcm/send', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'key=' + key
    },
    body: JSON.stringify(content)
  })
  .then(resp => resp.json())
  .then(resp => {
    response.send(JSON.stringify({success: true, response: resp}));
    return;
  })
  .catch(error => {
    console.log("error: ",error)
    return response.json({success: false, error: error})
  })
}

module.exports = {
  registerDevice: registerDevice,
  postNotification: postNotification
};
