import * as React from 'react'
import styled from 'styled-components'
import UserList from '../components/UserList'
import Code from '../components/Code'
import LinkList from '../components/LinkList'

export default function TrackingRoute () {
  return (
    <Wrapper>
      <h1>Tracking</h1>

      <p>
        Maybe you have noticed that also some tracking rules
        listened to our filter changes. If not, check it out.
        Set either the gender or the num hits and click on the action.
        Next to our <b>users/TRIGGER_FETCH</b> rule you
        can also see a <b>tracking/SET_USER_FILTER</b>:
      </p>

      <UserList/>

      <p>
        Check out the code:
      </p>

      <Code trim={6} content={`
        /**
         * When user filters are updated
         * Then we want to track this change
         */
        addRule({
          id: 'tracking/SET_USER_FILTER',
          target: ['users/SET_GENDER', 'users/SET_NUM_HITS'],
          output: '#tracking-event',
          consequence: action => sendEvent({
            event: 'set-user-filter',
            eventCategory: 'user',
            eventAction: action.type,
            eventLabel: action.payload
          })
        })
      `}/>

      <p>
        Note the output <b>#tracking-event</b>. Our rule does
        not dispatch an action but does something. This should be described
        in the output. I add a <b>#</b> as an prefix to indicate that
        the output is not an action.
      </p>

      <p>
        I also track when the our user fetch fails:
      </p>

      <Code trim={6} content={`
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
      `}/>

      <p>
        Check the devtools. you can see, that both rules have the same
        output. When you navigate to this output you can see, that both
        rules are attached to it. By carefully adding no-action outputs
        you can describe relations between different rules
      </p>

      <LinkList
        prev={['/user-module', 'User Module']}
        next={['/snackbar-module', 'Snackbar Module']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`