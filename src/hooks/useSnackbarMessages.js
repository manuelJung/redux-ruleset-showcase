import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {addMessage, removeMessage} from '../modules/snackbar'

export default function useSnackbarMessages () {
  const dispatch = useDispatch()
  const messages = useSelector(state => state.snackbar.messages)

  return {
    data: messages,
    add: msg => dispatch(addMessage(msg)),
    remove: msg => dispatch(removeMessage(msg))
  }
}