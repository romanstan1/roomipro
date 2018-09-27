import {LOG_OUT, LOG_IN_SUCCESSFUL} from '../constants/actionTypes'

export const logOut = () => dispatch => {
  console.log('log out')
  return dispatch({
    type: LOG_OUT
  })
}

export const logInSuccessful = user => dispatch =>
  dispatch({
    type: LOG_IN_SUCCESSFUL,
    payload: user
  })
