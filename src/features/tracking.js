import {addRule} from 'redux-ruleset'
import * as users from '../modules/users'

function sendEvent (event) {
  console.log('send ga event', event)
}

/**
 * When user filters are updated
 * Then we want to track this change
 */
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

/**
 * When our user fetch fails
 * Then we want to track it
 */
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