import moment from 'moment'

import {
  UPDATE_LOCATION_DATA,
  SELECT_LOCATION,
  SELECT_DATE
} from '../constants/actionTypes'

function createDate(days, weeks) {
  const id = moment().add(weeks, 'weeks').startOf('isoWeek').add(days - 1, 'days').valueOf()
  const date = moment(id).format('ddd Do MMM YYYY')
  return { id, date }
}

function createFortnight() {
  let i = new Date().getDay() - 28
  const limit = i + 14 + 28
  let dates = []
  for(i; i < limit; i++) {
    if((i%7 !== 6 ) && (i%7 !== 0)) dates.push(createDate(i, 0))
  }
  return dates
}

export const initialState = {
  locations: [],
  dates: createFortnight(),
  selectedLocation: null,
  selectedDate: null
}

export default function databaseReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_LOCATION_DATA: {
      return {
        ...state,
        locations: Object.values(action.payload)
      }
    }
    case SELECT_LOCATION: {
      return {
        ...state,
        selectedLocation: action.payload
      }
    }
    case SELECT_DATE: {
      return {
        ...state,
        selectedDate: action.payload
      }
    }
    default:
      return state;
  }
}
