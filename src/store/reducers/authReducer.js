import { LOG_IN_SUCCESSFUL, LOG_OUT } from '../constants/actionTypes';

export const initialState = {
  isAuthenticated: false,
  user: null
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOG_IN_SUCCESSFUL: {
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload
      }
    }
    case LOG_OUT: {
      return {
        ...state,
        isAuthenticated: false,
        user: null
      }
    }
    default:
      return state;
  }
}
