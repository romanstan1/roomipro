import {
  LOG_OUT,
  LOG_IN_SUCCESSFUL,
  EMAIL_SUCCESS,
  ERROR_MESSAGE,
  CLEAR_MESSAGE
} from '../constants/actionTypes'

export const initialState = {
  isAuthenticated: false,
  user: null,
  userMessage: null,
  error: false
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
        userMessage: `A password reset link has been sent to ${action.payload}. Please check your inbox.`,
        error: false
      }
    }
    case ERROR_MESSAGE: {
      return {
        ...state,
        userMessage: action.payload.message,
        error: true
      }
    }
    case CLEAR_MESSAGE: {
      return {
        ...state,
        userMessage: null,
        error: false
      }
    }
    default:
      return state;
  }
}
