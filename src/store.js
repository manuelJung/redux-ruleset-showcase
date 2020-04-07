import {createStore, compose, applyMiddleware} from 'redux'
import ruleMiddleware from 'redux-ruleset'

import usersModule from './modules/users'
import snackbarModule from './modules/snackbar'

import './features/tracking'
import './features/showErrors'

function rootReducer (state={}, action) {
  return {
    users: usersModule(state.users, action),
    snackbar: snackbarModule(state.snackbar, action)
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