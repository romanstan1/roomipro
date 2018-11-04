
import {
  GET_DARKSKY_SUCCESSFUL,
  GET_DARKSKY_FAILURE
} from '../constants/actionTypes'

export const getDarkSky = (token, location) => dispatch => {
  const {lat, lng} = location
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  })
  let url
  if(process.env.NODE_ENV === 'development') {
    url = `http://localhost:5000/room-ipro/us-central1/app/darksky/${lat}/${lng}`
  } else {
    url = `https://us-central1-room-ipro.cloudfunctions.net/app/darksky/${lat}/${lng}`
  }

  url = `https://us-central1-room-ipro.cloudfunctions.net/app/darksky/${lat}/${lng}`

  return fetch(url, {
    method: 'GET',
    headers: myHeaders,
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

    console.log('data', data);
    console.log('json data: ', JSON.stringify(data));

    return dispatch({
      type: GET_DARKSKY_SUCCESSFUL,
      payload: {location: location.id, weather: data}
    })
  })
  .catch(error => {
    console.error('GET_DARKSKY_FAILURE here:: ', error);
    return dispatch({
      type: GET_DARKSKY_FAILURE,
      payload: {location: location.id, weather: error}
    })
  })
}
