import * as React from 'react'
import styled from 'styled-components'
import LinkList from '../components/LinkList'
import UserList from '../components/UserList'
import Code from '../components/Code'

export default function SnackbarModuleRoute () {
  return (
    <Wrapper>
      <h1>Snackbar Module</h1>

      <p>
        The snackbar module is out next module. It is pretty simple. You
        can add messages by dispatching <b>snackbar/ADD_MESSAGE</b> and
        remove messages by dispatching <b>snackbar/REMOVE_MESSAGE</b>.
      </p>

      <p>
        When you set the <i>num-hits</i> in the user widget to 13 an error
        will happen and we show a snackbar alert. try it out:
      </p>

      <UserList/>

      <p>
        The rule that manages this is pretty simple:
      </p>

      <Code trim={6} content={`
        /**
         * When the user-fetch fails
         * Then a snackbar-message should pop up
         */
        addRule({
          id: 'feature/SHOW_FETCH_USER_ERROR',
          target: 'users/FETCH_FAILURE',
          output: 'snackbar/ADD_MESSAGE',
          consequence: action => snackbar.addMessage(action.payload)
        })
        })
      `}/>

      <p>
        But we also want to remove the message after a given time:
      </p>

      <Code trim={6} content={`
        /**
         * When a message gets added
         * Then we remove this message after 3 seconds
         */
        addRule({
          id: 'snackbar/REMOVE_MESSAGE_AFTER_TIME',
          target: 'snackbar/ADD_MESSAGE',
          output: 'snackbar/REMOVE_MESSAGE',
          delay: 3000,
          consequence: action => removeMessage(action.payload)
        })
      `}/>

      <p>
        Check the devtools. Set the <i>num-hits</i> to 13 and follow the 
        dataflow from the <b>users/SET_NUM_HITS</b> action to 
        the <b>snackbar/REMOVE_MESSAGE</b> action.
      </p>

      <LinkList
        prev={['/tracking', 'Tracking']}
        next={['/cancelation', 'Cancelation']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`