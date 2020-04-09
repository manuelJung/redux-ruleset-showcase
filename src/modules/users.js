import {addRule} from 'redux-ruleset'
import * as api from '../api'

export const FETCH_REQUEST = 'users/FETCH_REQUEST'
export const FETCH_SUCCESS = 'users/FETCH_SUCCESS'
export const FETCH_FAILURE = 'users/FETCH_FAILURE'
export const SET_GENDER = 'users/SET_GENDER'
export const SET_NUM_HITS = 'users/SET_NUM_HITS'
export const INIT = 'users/INIT'

export const defaultState = {
  isFetching: false,
  fetchError: null,
  hits: null,
  filters: {
    gender: 'all',
    numHits: 4
  }
}

export default function reducer (state=defaultState, action) {
  switch (action.type) {
    case INIT: return {
      ...state,
      filters: action.payload
    }
    case FETCH_REQUEST: return {
      ...state,
      isFetching: true
    }
    case FETCH_SUCCESS: return {
      ...state,
      isFetching: false,
      hits: action.payload
    }
    case FETCH_FAILURE: return {
      ...state,
      isFetching: false,
      fetchError: action.payload
    }
    case SET_GENDER: return {
      ...state,
      filters: {
        ...state.filters,
        gender: action.payload
      }
    }
    case SET_NUM_HITS: return {
      ...state,
      filters: {
        ...state.filters,
        numHits: action.payload
      }
    }
    default: return state
  }
}

// ACTION CREATORS

export const init = filters => ({
  type: INIT,
  payload: Object.assign({}, defaultState.filters, filters)
})

export const fetchRequest = filters => ({
  type: FETCH_REQUEST,
  payload: filters
})

export const fetchSuccess = users => ({
  type: FETCH_SUCCESS,
  payload: users
})

export const fetchFailure = error => ({
  type: FETCH_FAILURE,
  payload: error.toString()
})

export const setGender = gender => ({
  type: SET_GENDER,
  payload: gender
})

export const setNumHits = numHits => ({
  type: SET_NUM_HITS,
  payload: numHits
})

// RULES

/**
 * When we see a users/FETCH_REQUEST
 * Then we fetch the new users (by given filters)
 * and dispatch either users/FETCH_SUCCESS or users/FETCH_FAILURE
 */
addRule({
  id: 'users/FETCH',
  target: FETCH_REQUEST,
  output: [FETCH_SUCCESS, FETCH_FAILURE],
  concurrency: 'SWITCH',
  consequence: ({action}) => api.fetchUsers(action.payload).then(
    result => fetchSuccess(result),
    error => fetchFailure(error)
  )
})

/**
 * When an action gets dispatched that changes the filters
 * Then we want to dispatch users/FETCH_REQUEST
 */
addRule({
  id: 'users/TRIGGER_FETCH',
  target: [INIT, SET_GENDER, SET_NUM_HITS],
  output: FETCH_REQUEST,
  consequence: ({getState}) => {
    const state = getState()
    return fetchRequest(state.users.filters)
  }
})

/**
 * When users/INIT gets dispatched
 * and we already have results
 * and the filters did not change
 * Then the action should get canceled
 */
addRule({
  id: 'users/PREVENT_INIT',
  target: INIT,
  position: 'INSTEAD',
  condition: (action,getState) => {
    const state = getState()
    if(!state.users.hits) return false
    for (let key in action.payload) {
      if(action.payload[key] !== state.users.filters[key]) return false
    }
    return true
  },
  consequence: () => null
})