import {addRule} from 'redux-ruleset'
import * as users from '../modules/users'
import * as snackbar from '../modules/snackbar'

/**
 * When the user-fetch fails
 * Then a snackbar-message should pop up
 */
addRule({
  id: 'feature/SHOW_FETCH_USER_ERROR',
  target: users.FETCH_FAILURE,
  output: snackbar.ADD_MESSAGE,
  consequence: action => snackbar.addMessage({
    type: 'error',
    message: action.payload
  })
})
