import {
  UPDATE_LOCATION_DATA,
  SELECT_LOCATION,
  SELECT_DATE,
  ADD_DATE_TO_LOCATION,
  PLACE_BOOKING
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

export const selectDate = (date, attending, people) => dispatch =>
  dispatch({
    type: SELECT_DATE,
    payload: {date, attending, people}
  })

export const addDateToLocation = (id, dates) => dispatch =>
  dispatch({
    type: ADD_DATE_TO_LOCATION,
    payload: {id, dates}
  })

export const  placeBooking = (bookingUser) => dispatch =>
  dispatch({
    type: PLACE_BOOKING,
    payload: bookingUser
  })
