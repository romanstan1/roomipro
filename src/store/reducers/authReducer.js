import {
  LOG_OUT,
  LOG_IN_SUCCESSFUL,
  EMAIL_SUCCESS,
  ERROR_MESSAGE,
  CLEAR_MESSAGE
} from '../constants/actionTypes'

export const initialState = {
  isAuthenticated: true,
  user: null,
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
        error: false
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null
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
