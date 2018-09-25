import {LOG_OUT} from '../constants/actionTypes'

export const logOut = () => dispatch => {
  console.log('log out')
  return dispatch({
    type: LOG_OUT
  })
}
