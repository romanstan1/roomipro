import {
  LOG_OUT,
  LOG_IN_SUCCESSFUL,
  EMAIL_SUCCESS,
  ERROR_MESSAGE,
  CLEAR_MESSAGE
} from '../constants/actionTypes'

export const logOut = () => dispatch =>
  dispatch({ type: LOG_OUT })

export const logInSuccessful = user => dispatch =>
  dispatch({
    type: LOG_IN_SUCCESSFUL,
    payload: user
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

function clearMessage(dispatch) {
  dispatch({ type: CLEAR_MESSAGE })

  // setTimeout(()=>{
  // }, 2500)
}
