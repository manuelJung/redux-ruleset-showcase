import {createStore, compose, applyMiddleware} from 'redux'
import ruleMiddleware from 'redux-ruleset'
import usersModule from './modules/users'

function rootReducer (state={}, action) {
  return {
    users: usersModule(state.users, action)
  }
}

let composeEnhancers = compose

const composeWithDevToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
if (typeof composeWithDevToolsExtension === 'function') {
  composeEnhancers = composeWithDevToolsExtension
}

export default createStore(
  rootReducer,
  undefined,
  composeEnhancers(
    applyMiddleware/*::<RootState,Action,Dispatch>*/(ruleMiddleware)
  )
)