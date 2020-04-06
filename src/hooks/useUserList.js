import * as React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setGender, setNumHits, init} from '../modules/users'

export default function useUserList () {
  const dispatch = useDispatch()
  const userState = useSelector(state => state.users)

  // initially fetch users
  React.useEffect(() => {
    if (!userState.hits && !userState.isFetching && !userState.fetchError) {
      dispatch(init(userState.filters))
    }
  }, [userState, dispatch])

  return {
    hits: userState.hits,
    isFetching: userState.isFetching,
    fetchError: userState.fetchError,
    filters: userState.filters,
    setGender: gender => dispatch(setGender(gender)),
    setNumHits: num => dispatch(setNumHits(num))
  }
}