import {addRule} from 'redux-ruleset'
import * as api from '../api'

export const ADD_MESSAGE = 'snackbar/ADD_MESSAGE'
export const REMOVE_MESSAGE = 'snackbar/REMOVE_MESSAGE'

const defaultState = {
  messages: []
}

export default function reducer (state=defaultState, action) {
  switch (action.type) {
    case ADD_MESSAGE: return {
      ...state,
      messages: [action.payload, ...state.messages]
    }
    case REMOVE_MESSAGE: return {
      ...state,
      messages: state.messages.filter(msg => msg !== action.payload)
    }
    default: return state
  }
}

// ACTION CREATORS

export const addMessage = msg => ({
  type: ADD_MESSAGE,
  payload: msg
})

export const removeMessage = msg => ({
  type: REMOVE_MESSAGE,
  payload: msg
})

// RULES

addRule({
  id: 'snackbar/REMOVE_MESSAGE_AFTER_TIME',
  target: ADD_MESSAGE,
  output: REMOVE_MESSAGE,
  delay: 3000,
  consequence: ({action}) => removeMessage(action.payload)
})