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
  return fetch(`http://localhost:5000/room-ipro/us-central1/app/darksky/${lat}/${lng}`, {
    method: 'GET',
    headers: myHeaders,
  })
  .then(res => {
    if (res.status === 200) return res.json()
    else throw new Error('Something went wrong on api server!')
  })
  .then(data => {
    console.log('Darksky data:', location.id, data);
    return dispatch({
      type: GET_DARKSKY_SUCCESSFUL,
      payload: {location: location.id, weather: data}
    })
  })
  .catch(error => {
    console.error('GET_DARKSKY_FAILURE', error);
    return dispatch({
      type: GET_DARKSKY_FAILURE,
      payload: {location: location.id, weather: error}
    })
  })
}
