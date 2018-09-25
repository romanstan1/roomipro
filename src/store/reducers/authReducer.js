import { AUTH_SUCCESSFUL, LOG_OUT } from '../constants/actionTypes';

export const initialState = {
  isAuthenticated: true,
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTH_SUCCESSFUL: {
      return {
        ...state,
        isAuthenticated: true
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false
      }
    }
    default:
      return state;
  }
}
