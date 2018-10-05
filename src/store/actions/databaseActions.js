import {
  UPDATE_LOCATION_DATA,
  SELECT_LOCATION,
  SELECT_DATE
} from '../constants/actionTypes'

export const updateLocationData = data => dispatch =>
  dispatch({
    type: UPDATE_LOCATION_DATA,
    payload: data
  })

export const selectLocation = location => dispatch =>
  dispatch({
    type: SELECT_LOCATION,
    payload: location
  })

export const selectDate = date => dispatch =>
  dispatch({
    type: SELECT_DATE,
    payload: date
  })
