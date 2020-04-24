import * as React from 'react'
import styled from 'styled-components'
import {addRule, removeRule} from 'redux-ruleset'
import {useDispatch} from 'react-redux'
import * as snackbar from '../modules/snackbar'
import Code from '../components/Code'
import LinkList from '../components/LinkList'

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
      consequence: () => snackbar.addMessage('mutated-message')
    })
    return () => removeRule(rule)
  }, [ruleActive])

  return (
    <Wrapper>
      <h1>Action Mutations</h1>

      <p>
        One of the coolest features of <i>redux-ruleset</i> is, that
        it allows you to mutate actions. Below is a simple form where
        you can type in a message. When you click on add
        a <b>snackbar/ADD_MESSAGE</b> gets dispatched:
      </p>

      <div className='snackbar-form'>
        <input type='text' placeholder='message...' value={message} onChange={e => setMessage(e.target.value)}/>
        <button onClick={() => dispatch(snackbar.addMessage(message))}>add</button>
      </div>

      <p>
        Now lets create a rule, that manipulates the action:
      </p>

      <Code trim={6} content={`
        addRule({
          id: 'feature/MUTATE_SNACKBAR_MESSAGE',
          target: 'snackbar/ADD_MESSAGE',
          output: 'snackbar/ADD_MESSAGE',
          position: 'INSTEAD',
          consequence: () => snackbar.addMessage('mutated-message')
        })
      `}/>

      <p>
        By clicking the button below, you add the above rule. After clicking
        the button try to send another message
      </p>

      <button onClick={() => setRuleActive(!ruleActive)}>
        {ruleActive ? 'remove' : 'add'} rule
      </button>

      <p>
        Open the devtools. When you click on your last ADD_MESSAGE action,
        you can see that our rule reacted to the action. The orange <b>M</b> indicates
        that it mutated the original action
      </p>

      <p>
        In further versions of the devtools extension I will provide more
        information about the mutation
      </p>

      <LinkList
        prev={['/cancelation', 'Cancelation']}
        // next={['/mutation', 'Action Mutations']}
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

  > .snackbar-form {
    display: flex;
    > input {
      flex: 1;
      font-size: 18px;
      padding: 0 10px;
    }
    > button {
      width: 100px;
      padding: 10px;
      background: steelblue;
      color: white;
      font-weight: bold;
      font-size: 18px;
      cursor: pointer;
    }
  }
`