import * as React from 'react'
import styled from 'styled-components'
import LinkList from '../components/LinkList'
import Code from '../components/Code'
import { useDispatch } from 'react-redux'
import * as users from '../modules/users'

export default function CancelationRoute () {
  const dispatch = useDispatch()
  const initUsers = () => dispatch(users.init({
    gender: 'female',
    numHits: 10
  }))
  return (
    <Wrapper>
      <h1>Cancelation</h1>

      <p>
        Sometimes it is usefull to cancel actions. For example:
        Our users module can dispatch the action <b>users/INIT</b>.
        This action can set the filters. But it may be stupit to 
        dispatch the action with the exact same filters that are currently
        in the users state. So I added a rule the cancels the action
        when the filters would not change:
      </p>

      <Code trim={6} content={`
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
          condition: (action,{getState}) => {
            const state = getState()
            const {hits, filters} = state.users
            const {gender, numHits} = action.payload
            if(!hits) return false
            if(filters.gender !== gender) return false
            if(filters.numHits !== numHits) return false
            return true
          },
          consequence: () => null
        })
      `}/>

      <p>
        The following button dispatches a <b>users/INIT</b> with gender as female
        and num hits as 10. The first time you click it everything works normal.
        You see a <b>users/INIT</b> followed by a <b>users/FETCH_REQUEST</b> and
        a <b>users/FETCH_SUCCESS</b>. The second time you click it the filters won't
        change anymore and our rule kicks in. 
      </p>

      <button onClick={initUsers}>init</button>

      <LinkList
        prev={['/snackbar-module', 'Snackbar Module']}
        // next={['/cancelation', 'Cancelation']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;

  > button {
    display: block;
    width: 100%;
    padding: 10px;
    background: steelblue;
    color: white;
    font-weight: bold;
    font-size: 18px;
    cursor: pointer;
    margin: 10px 0;
  }
`