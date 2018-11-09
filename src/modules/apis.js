import {messaging} from 'firebase/initialize'

export function registerDeviceForNotifications() {
  if(!!messaging) {
    messaging.requestPermission()
    .then(() => messaging.getToken())
    .then(token => {
      let url = 'https://us-central1-room-ipro.cloudfunctions.net/app/registerDevice'
      fetch(url,
        {
          method: "POST",
          mode: 'cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body:"token=" + token + "&topic=roomipro1" // the topic name
        })
        .then(res => res.json())
        .then(resp => {})
        .catch(error => console.log("Error with notification registration", error))
    })
    .catch(error => console.log("Error with messaging request persmission", error))
  }
}

export function darkSkyApiCall(url, headers) {
  return fetch(url, {
    method: 'GET',
    headers,
  })
  .then(res => {
    if (res.status === 200) return res.json()
    else throw new Error('Something went wrong on api server!')
  })
  .then(res => {
    if(res.errno) {
      throw new Error('Something went wrong on api server!')
      return;
    }
    const data = res.data.map(day => {
      return {
        time: day.time,
        icon: day.icon,
        temperatureHigh: day.temperatureHigh
      }
    })
    return data
  })
}

export function postNotificationApi(url, idToken, {title, body, link }) {
  return fetch(url,
  {
    method: "POST",
    mode: 'cors',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Bearer ' + idToken
    },
    body:"title=" + title + "&body=" + body + "&link=" + link + "&icon=https://room-ipro.firebaseapp.com/fav128.png"
  })
  .then(res => res.json())
  .then(res => { console.log('res notification::: ',res) })
  .catch(error => console.log("Error with posting notification : ",error))
}
