import * as React from 'react'
import styled from 'styled-components'
import {addRule, removeRule} from 'redux-ruleset'
import {useDispatch} from 'react-redux'
import * as snackbar from '../modules/snackbar'

export default function MutationRoute () {
  const [ruleActive, setRuleActive] = React.useState(false)
  const dispatch = useDispatch()
  const [message, setMessage] = React.useState('')

  React.useEffect(() => {
    if(!ruleActive) return
    const rule = addRule({
      id: 'feature/MUTATE_SNACKBAR_MESSAGE',
      target: 'snackbar/ADD_MESSAGE',
      output: 'snackbar/ADD_MESSAGE',
      position: 'INSTEAD',
      consequence: action => snackbar.addMessage('mutated-message')
    })
    return () => removeRule(rule)
  }, [ruleActive])

  return (
    <Wrapper>
      <h1>Action Mutations</h1>

      <p>
        One of the coolest features of <i>redux-ruleset</i> is, that
        it allows you to mutate actions. 
      </p>

      <button onClick={() => setRuleActive(!ruleActive)}>
        {ruleActive ? 'remove' : 'add'}
      </button>

      <div className='snackbar-form'>
        <input type='text' value={message} onChange={e => setMessage(e.target.value)}/>
        <button onClick={() => dispatch(snackbar.addMessage(message))}>add</button>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`