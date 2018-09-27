import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import {history} from '../App'
import rootReducer from './reducers'

const logger = store => next => action => {
  let result = next(action)
  console.log('action.type:', action.type)
  console.log("store: ",store.getState())
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
  // applyMiddleware(...middleware)
  composedEnhancers
)

export default store
