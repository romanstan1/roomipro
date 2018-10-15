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
  updateWidth
} from './databaseActions.js'

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
  updateWidth
}
