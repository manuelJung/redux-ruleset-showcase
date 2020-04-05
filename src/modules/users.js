import {addRule} from 'redux-ruleset'
import * as api from '../api'

const FETCH_REQUEST = 'users/FETCH_REQUEST'
const FETCH_SUCCESS = 'users/FETCH_SUCCESS'
const FETCH_FAILURE = 'users/FETCH_FAILURE'
const SET_GENDER = 'users/SET_GENDER'
const SET_NUM_HITS = 'users/SET_NUM_HITS'

export const defaultState = {
  isFetching: false,
  fetchError: null,
  users: [],
  filters: {
    gender: 'all',
    numHits: 10
  }
}

export default function reducer (state=defaultState, action) {
  switch (action.type) {
    case FETCH_REQUEST: return {
      ...state,
      isFetching: true
    }
    case FETCH_SUCCESS: return {
      ...state,
      isFetching: false,
      users: action.payload
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
  }
}

// ACTION CREATORS

export const fetchRequest = () => ({
  type: FETCH_REQUEST
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
  type: SET_GENDER,
  payload: numHits
})

// RULES

addRule({
  id: 'users/FETCH',
  target: FETCH_REQUEST,
  output: [FETCH_SUCCESS, FETCH_FAILURE],
  concurrency: 'SWITCH',
  consequence: ({getState}) => {
    const state = getState()
    return api.fetchUsers(state.users.filters).then(
      result => fetchSuccess(result),
      error => fetchFailure(error)
    )
  }
})

addRule({
  id: 'users/TRIGGER_FETCH',
  target: [SET_GENDER, SET_NUM_HITS],
  output: FETCH_REQUEST,
  consequence: () => fetchRequest()
})