import moment from 'moment'

import {
  UPDATE_LOCATION_DATA,
  SELECT_LOCATION,
  SELECT_DATE,
  ADD_DATE_TO_LOCATION,
  PLACE_BOOKING,
  SWITCH_PAGE,
  UPDATE_WIDTH,
  FOCUS_ON_LOCATION,
  REMOVE_LOADING_DATA,
  GET_DARKSKY_SUCCESSFUL
} from '../constants/actionTypes'


// clear-day
// clear-night
// rain
// snow
// sleet
// wind
// fog
// cloudy
// partly-cloudy-day
// partly-cloudy-night
// hail
// tornado
// thunderstorm


function createDate(days, weeks, dayOfWeek) {
  const id = moment().add(weeks, 'weeks').startOf('isoWeek').add(days - 1, 'days').valueOf()
  const date = moment(id).format('ddd Do MMM YYYY')
  return { id, date, dayOfWeek }
}

const dates = (function createFortnight() {
  let i = new Date().getDay()
  const limit = i + 14 + 28
  let dates = []
  for(i; i < limit; i++) {
    if((i%7 !== 6 ) && (i%7 !== 0)) dates.push(createDate(i - 28 , 0, i%7))
    // if((i%7 !== 6 ) && (i%7 !== 0)) dates.push(createDate(i - 28 , 0))
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
  loadingThesePages: [],
  today: moment().startOf('day').valueOf(),
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
        loadingThesePages: [].concat(state.loadingThesePages, action.payload)
      }
    }
    case REMOVE_LOADING_DATA: {
      return {
        ...state,
        loadingThesePages: state.loadingThesePages.filter(page => page.location !== action.payload)
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
    case GET_DARKSKY_SUCCESSFUL: {
      console.log('GET_DARKSKY_SUCCESSFUL', action.type, action.payload );
      return {
        ...state,
        dates: state.dates.map(date => {
          const findDate = action.payload.weather.data.find(ele => ele.time + '000' == date.id.toString())
          if(findDate) return {
            ...date,
            locations: [].concat(date.locations || [], {
              id:  action.payload.location,
              weather: findDate
            })
          }
          return date
        })
      }
    }
    default:
      return state;
  }
}
