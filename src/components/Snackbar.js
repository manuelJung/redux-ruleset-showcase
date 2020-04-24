import * as React from 'react'
import styled from 'styled-components'
import useMessages from '../hooks/useSnackbarMessages'

export default function Snackbar () {
  const messages = useMessages()

  return (
    <Wrapper>
      {messages.data.map((msg,i) => (
        <Msg key={i}>{msg}</Msg>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  max-width: 500px;
`

const Msg = styled.div`
  margin: 10px;
  background: #607d8b;
  border-left: 10px solid #2196f3;
  color: white;
  padding: 10px;
  font-size: 18px;
`