import {addRule} from 'redux-ruleset'
import * as users from '../modules/users'

function sendEvent (event) {
  console.log('send ga event', event)
}

addRule({
  id: 'tracking/SET_USER_FILTER',
  target: [users.SET_GENDER, users.SET_NUM_HITS],
  output: '#tracking-event',
  consequence: action => sendEvent({
    event: 'set-user-filter',
    eventCategory: 'user',
    eventAction: action.type,
    eventLabel: action.payload
  })
})

addRule({
  id: 'tracking/USER_FETCH_ERROR',
  target: users.FETCH_FAILURE,
  output: '#tracking-event',
  consequence: action => sendEvent({
    event: 'user-fetch-error',
    eventCategory: 'user',
    eventAction: action.type,
    eventLabel: action.payload.toString()
  })
})