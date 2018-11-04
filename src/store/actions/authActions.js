import {
  LOG_OUT,
  LOG_IN_SUCCESSFUL,
  EMAIL_SUCCESS,
  ERROR_MESSAGE,
  CLEAR_MESSAGE,
  NOT_LOGGED_IN
} from '../constants/actionTypes'

export const logOut = () => dispatch =>
  dispatch({ type: LOG_OUT })

export const logInSuccessful = user => dispatch =>
  dispatch({
    type: LOG_IN_SUCCESSFUL,
    payload: user
  })

export const notLoggedIn = () => dispatch =>
  dispatch({
    type: NOT_LOGGED_IN
  })

export const emailSuccess = email => dispatch => {
  return dispatch({
    type: EMAIL_SUCCESS,
    payload: email
  })
}

export const errorMessage = error => dispatch => {
  return dispatch({
    type: ERROR_MESSAGE,
    payload: error
  })
}

export const clearMessage = () => dispatch =>
  dispatch({ type: CLEAR_MESSAGE })
