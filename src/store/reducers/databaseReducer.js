import {
  UPDATE_LOCATION_DATA,
} from '../constants/actionTypes'

export const initialState = {
}

export default function databaseReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_DATA: {
      return {
        ...state
      }
    }
    default:
      return state;
  }
}
