import {
  UPDATE_LOCATION_DATA,
} from '../constants/actionTypes'

export const initialState = {
  locations: []
}

export default function databaseReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_DATA: {
      return {
        ...state,
        locations: Object.values(action.payload)
      }
    }
    default:
      return state;
  }
}
