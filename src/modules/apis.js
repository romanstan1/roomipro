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
