import {
  UPDATE_LOCATION_DATA,
  SELECT_LOCATION,
  SELECT_DATE,
  ADD_DATE_TO_LOCATION,
  PLACE_BOOKING,
  SWITCH_PAGE,
  UPDATE_WIDTH,
  FOCUS_ON_LOCATION,
  REMOVE_LOADING_DATA
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

export const selectDate = (date, attending, people, seats, user) => dispatch =>
  dispatch({
    type: SELECT_DATE,
    payload: {date, attending, people, seats, user}
  })

export const addDateToLocation = (id, dates) => dispatch =>
  dispatch({
    type: ADD_DATE_TO_LOCATION,
    payload: {id, dates}
  })

export const placeBooking = (location, date) => dispatch =>
  dispatch({
    type: PLACE_BOOKING,
    payload: {location, date}
  })

export const switchPage = (page) => dispatch =>
  dispatch({
    type: SWITCH_PAGE,
    payload: page
  })

export const updateWidth = (width) => dispatch =>
  dispatch({
    type: UPDATE_WIDTH,
    payload: width
  })

export const focusOnLocation = (location) => dispatch =>
  dispatch({
    type: FOCUS_ON_LOCATION,
    payload: location
  })

export const removeLoadingData = (location) => dispatch =>
  dispatch({
    type: REMOVE_LOADING_DATA,
    payload: location
  })
