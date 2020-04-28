import * as React from 'react'
import styled from 'styled-components'
import UserList from '../components/UserList'
import Code from '../components/Code'
import LinkList from '../components/LinkList'

export default function UserModuleRoute () {
  return (
    <Wrapper>
      <h1>User Module</h1>
      <p>
        First let's check out our main module: The User Module.
        It's a very simple redux-module. It holds a list of users
        and filters (gender and hits-per-page) and manages the api 
        call to our demo-user api.
      </p>

      <UserList/>

      <h3>How update works</h3>

      <p>
        We can update our users by updating the 
        filters <b>gender</b> or <b>num-hits</b>. This results 
        in the following actions to update our module:
      </p>

      <ul>
        <li>set the gender <b>users/SET_GENDER</b></li>
        <li>set num-hits <b>users/SET_NUM_HITS</b></li>
        <li>set all filters <b>users/INIT</b></li>
      </ul>

      <p>
        If one of these actions gets dispatched we have to refetch our users. This
        is managed by a rule:
      </p>

      <Code trim={6} content={`
        /**
         * When an action gets dispatched that changes the filters
         * Then we want to trigger a new user-fetch
         */
        addRule({
          id: 'users/TRIGGER_FETCH', // name of the rule
          target: [ // action types the rule listens to
            'users/INIT', 
            'users/SET_GENDER', 
            'users/SET_NUM_HITS'
          ],
          output: 'users/FETCH_REQUEST', // the output action type
          consequence: (_,{getState}) => {
            const state = getState()
            return fetchRequest(state.users.filters) // dispatch
          }
        })
      `} />

      <p>
        Whenever one of these actions gets dispatched our rule dispatches 
        a <b>FETCH_REQUEST</b>. Set the gender to <i>female</i> and open the
        devtools. You will see a <b>users/SET_GENDER</b>. When you click on it
        you can see, that our rule reacted to this action. By clicking on the
        rule you can see, that it dispatched a <b>users/FETCH_REQUEST</b>
      </p>

      <p>
        Now we need a rule that manages the data-fetching for our user:
      </p>

      <Code trim={6} content={`
        /**
         * When we see a users/FETCH_REQUEST
         * Then we fetch the new users (by given filters)
         * and dispatch either the result or the error
         */
        addRule({
          id: 'users/FETCH',
          target: 'users/FETCH_REQUEST',
          output: ['users/FETCH_SUCCESS', 'users/FETCH_FAILURE'],
          concurrency: 'SWITCH',
          consequence: action => api.fetchUsers(action.payload).then(
            result => fetchSuccess(result),
            error => fetchFailure(error)
          )
        })
      `}/>

      <p>
        Out <b>users/FETCH</b> rule fetches our data and dispatches the result.
        Note the <i>SWITCH</i> concurrency. With this concurrency we can be shure,
        that only the most recent SUCCESS action gets dispatched last
      </p>

      <LinkList
        next={['/tracking', 'Tracking']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`