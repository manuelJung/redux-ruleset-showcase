import * as React from 'react'
import styled from 'styled-components'
import UserList from '../components/UserList'
import Code from '../components/Code'
import LinkList from '../components/LinkList'
import * as users from '../modules/users'
import {sendEvent} from '../features/tracking'
import {addRule, removeRule} from 'redux-ruleset'

export default function SagasRoute () {
  useRules()
  return (
    <Wrapper>
      <h1>Sagas</h1>

      <p>
        You can manage the lifetime of rules by a concept called sagas,
        since it shares some similarites with <i>redux-saga</i>. A saga
        listens to a stream of actions and finally adds/removes the rule.
        Given the following scenario:
      </p>

      <p>
        We want to track "informed-user". An informed used is a customer that
        triggers at least two different filters from our users module:
      </p>

      <Code trim={6} content={`
        /**
         * Given a users filter gets updated
         * and another filter gets updated
         * Then we want to classify the user as an "informed-user"
         */
        const rule = addRule({
          id: 'tracking/INFORMED_USER',
          target: ['users/SET_NUM_HITS', 'users/SET_GENDER'],
          output: '#tracking-event',
          addOnce: true,
          addWhen: function* (next) {
            // wait for one of both actions
            const action = yield next(['users/SET_NUM_HITS', 'users/SET_GENDER'])
            const isSetGender = action.type === 'users/SET_GENDER'
    
            // wait for the other action
            if(isSetGender) yield next('users/SET_NUM_HITS')
            else yield next('users/SET_GENDER')
    
            // add rule before last actions gets dispatched
            return 'ADD_RULE_BEFORE'
          },
          consequence: () => sendEvent({
            event: 'informed-user',
            eventCategory: 'user'
          })
      `}/>

      <p>
        If you don't know redux-ruleset this looks unfamiliar, so let me 
        explain step by step. First look at our <b>addWhen</b> saga. This saga
        manages when our rule get's added. First we will wait for either
        a <b>users/SET_NUM_HITS</b> or a <b>users/SET_GENDER</b>. <br/>
        When one of those actions gets dispatched we proceed and wait for 
        the next action. If the last action was <b>users/SET_GENDER</b> we
        wait for <b>users/SET_NUM_HITS</b>. If not, we wait for the other action.
        <br/>
        At the end we return <b>ADD_RULE_BEFORE</b>. That means, that we add the
        rule, before the last action the saga listened to gets dispatched.
        That way way our rule can react to the same action (see target) and sends
        the tracking event. The <b>addOnce</b> flag indicates that the rule will
        be removed after the consequence ends. Try it out:
      </p>

      <UserList/>

      <p>
        When you set a filter you will notice the purple counter next to the action.
        That means that our saga yielded to this action. After setting the other 
        filter another purple dot will appear. And you can see, that our 
        rule was executed.
      </p>

      <p>
        If you need more insights click on the rule and navigate to <b>Rule-History</b>.
        Here you can see everything that happened within our rule
      </p>

      <LinkList
        prev={['/url-hydration', 'Url Hydration']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`

function useRules () {
  React.useEffect(() => {
    /**
     * Given a users filter gets updated
     * and another filter gets updated
     * Then we want to classify the user as an "informed-user"
     */
    const rule = addRule({
      id: 'tracking/INFORMED_USER',
      target: [users.SET_NUM_HITS, users.SET_GENDER],
      output: '#tracking-event',
      addOnce: true,
      addWhen: function* (next) {
        // wait for one of both actions
        const action = yield next([users.SET_NUM_HITS, users.SET_GENDER])
        const isSetGender = action.type === users.SET_GENDER

        // wait for the other action
        if(isSetGender) yield next(users.SET_NUM_HITS)
        else yield next(users.SET_GENDER)

        // add rule before last actions gets dispatched
        return 'ADD_RULE_BEFORE'
      },
      consequence: () => sendEvent({
        event: 'informed-user',
        eventCategory: 'user'
      })
    })
    return () => removeRule(rule)
  }, [])
}