import {
  GET_DARKSKY_SUCCESSFUL,
  GET_DARKSKY_FAILURE
} from '../constants/actionTypes'

export const getDarkSky = (token, lat, lng) => dispatch => {
  const myHeaders = new Headers({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + token
  })
  return fetch('http://localhost:5000/room-ipro/us-central1/app/darksky', {
    method: 'GET',
    headers: myHeaders,
  })
  .then(res => {
    if (res.status === 200) return res.json()
    else throw new Error('Something went wrong on api server!')
  })
  .then(data => {
    console.log('darksky data:', data)
    return dispatch({
      type: GET_DARKSKY_SUCCESSFUL
      // payload: user
    })
  })
  .catch(error => {
    console.error(error);
    return dispatch({
      type: GET_DARKSKY_FAILURE,
      payload: error
    })
  })
}
