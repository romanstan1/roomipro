// Auth
import {
  logOut,
  logInSuccessful,
  emailSuccess,
  errorMessage,
  clearMessage
} from './authActions.js'

// Database
import {
  updateLocationData,
  selectLocation,
  selectDate,
  addDateToLocation,
  placeBooking,
  switchPage,
  updateWidth,
  focusOnLocation,
  removeLoadingData
} from './databaseActions.js'

// Api
import {
  getDarkSky
} from './apiActions.js'

export {
  // Auth
  logOut,
  logInSuccessful,
  emailSuccess,
  errorMessage,
  clearMessage,
  // Database
  updateLocationData,
  selectLocation,
  selectDate,
  addDateToLocation,
  placeBooking,
  switchPage,
  updateWidth,
  focusOnLocation,
  removeLoadingData,
  // Api
  getDarkSky
}
