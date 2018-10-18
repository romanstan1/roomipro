import moment from 'moment'

import {
  UPDATE_LOCATION_DATA,
  SELECT_LOCATION,
  SELECT_DATE,
  ADD_DATE_TO_LOCATION,
  PLACE_BOOKING,
  SWITCH_PAGE,
  UPDATE_WIDTH,
  FOCUS_ON_LOCATION
} from '../constants/actionTypes'

function createDate(days, weeks) {
  const id = moment().add(weeks, 'weeks').startOf('isoWeek').add(days - 1, 'days').valueOf()
  const date = moment(id).format('ddd Do MMM YYYY')
  return { id, date }
}

const dates = (function createFortnight() {
  let i = new Date().getDay()
  const limit = i + 14 + 28
  let dates = []
  for(i; i < limit; i++) {
    if((i%7 !== 6 ) && (i%7 !== 0)) dates.push(createDate(i - 28 , 0))
  }
  return dates
})()

export const initialState = {
  locations: [],
  dates: dates,
  selectedLocation: null,
  focusedLocation: null,
  selectedDate: null,
  attendingOnDate: false,
  attendees: [],
  maxSeats: 0,
  page: 0,
  width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
}

export default function databaseReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_DATA: {
      return {
        ...state,
        locations: Object.values(action.payload).map(location => ({...location, dates:[]}))
      }
    }
    case SELECT_LOCATION: {
      return {
        ...state,
        selectedLocation: action.payload,
        selectedDate: null,
        attendees: []
      }
    }
    case FOCUS_ON_LOCATION: {
      return {
        ...state,
        focusedLocation: action.payload
      }
    }
    case SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload.date,
        attendingOnDate: action.payload.attending,
        attendees: action.payload.people,
        maxSeats: action.payload.seats
      }
    }
    case PLACE_BOOKING: {
      return {
        ...state,
        attendingOnDate: !state.attendingOnDate,
        attendees: [].concat(state.attendees, action.payload)
      }
    }
    case ADD_DATE_TO_LOCATION: {
      return {
        ...state,
        locations: state.locations.map(location => (
          location.id === action.payload.id?
          {
            ...location,
            dates: action.payload.dates
          }:
          location
        ))
      }
    }
    case SWITCH_PAGE: {
      return {
        ...state,
        page:action.payload
      }
    }
    case UPDATE_WIDTH: {
      return {
        ...state,
        width:action.payload
      }
    }
    default:
      return state;
  }
}
