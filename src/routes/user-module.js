import * as React from 'react'
import styled from 'styled-components'

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
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`