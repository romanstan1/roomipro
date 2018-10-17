import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import {history} from '../App'
import rootReducer from './reducers'
import {clearMessage} from 'store/actions'

const logger = store => next => action => {
  let result = next(action)
  // console.log('action.type:', action.type)
  // console.log("store: ",store.getState())
  // console.log(" ")
  if(action.type === '@@router/LOCATION_CHANGE') store.dispatch(clearMessage())
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
