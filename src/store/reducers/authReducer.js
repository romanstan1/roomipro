import {
  LOG_OUT,
  LOG_IN_SUCCESSFUL,
  EMAIL_SUCCESS,
  ERROR_MESSAGE,
  CLEAR_MESSAGE,
  NOT_LOGGED_IN
} from '../constants/actionTypes'

export const initialState = {
  isAuthenticated: false,
  user: null,
  // user: {email: 'roman@stankiewicz.com', admin: true},
  // isAuthenticated: true,
  logInPending: true,
  userMessage: null,
  error: false,
  emailSuccess: false
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESSFUL: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        error: false,
        logInPending: false
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        logInPending: false
      }
    }
    case NOT_LOGGED_IN: {
      return {
        ...state,
        logInPending: false
      }
    }
    case EMAIL_SUCCESS: {
      return {
        ...state,
        userMessage: `A password reset link has been sent to <span>${action.payload}</span>`,
        error: false,
        emailSuccess: true,
      }
    }
    case ERROR_MESSAGE: {
      return {
        ...state,
        userMessage: action.payload.message,
        error: true,
        emailSuccess: false
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        userMessage: null,
        error: false,
        emailSuccess: false
      }
    }
    default:
      return state;
  }
}
