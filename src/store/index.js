import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import {history} from '../App'
import rootReducer from './reducers'
import {CLEAR_MESSAGE} from 'store/constants/actionTypes'

const logger = store => next => action => {
  let result = next(action)
  console.log('action.type:', action.type)
  console.log("store: ",store.getState())
  if(action.type === '@@router/LOCATION_CHANGE') store.dispatch({ type: CLEAR_MESSAGE })
  return result
}

const middleware = [
  thunk,
  routerMiddleware(history),
  logger
]

const composedEnhancers = compose(
  applyMiddleware(...middleware)
)

const store = createStore(
  rootReducer,
  composedEnhancers
)

export default store
