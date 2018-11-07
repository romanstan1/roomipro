import {darkSkyApiCall} from 'modules/apis'
import {
  GET_DARKSKY_SUCCESSFUL,
  GET_DARKSKY_FAILURE
} from '../constants/actionTypes'

export const getDarkSky = (token, location) => dispatch => {
  const {lat, lng} = location
  const headers = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  })
  let url
  if(process.env.NODE_ENV === 'development') {
    url = `http://localhost:5000/room-ipro/us-central1/app/darksky/${lat}/${lng}`
  }
  url = `https://us-central1-room-ipro.cloudfunctions.net/app/darksky/${lat}/${lng}`

  darkSkyApiCall(url, headers)
  .then(data =>
    dispatch({
    type: GET_DARKSKY_SUCCESSFUL,
    payload: {location: location.id, weather: data}
  }))
  .catch(error => {
    console.error('GET_DARKSKY_FAILURE here:: ', error);
    return dispatch({
      type: GET_DARKSKY_FAILURE,
      payload: {location: location.id, weather: error}
    })
  })
}
