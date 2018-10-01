import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import authReducer from './authReducer'
import databaseReducer from './databaseReducer'

export default combineReducers({
  routing: routerReducer,
  auth: authReducer,
  data: databaseReducer,
})
