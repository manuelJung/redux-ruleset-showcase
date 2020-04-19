import * as React from 'react'
import styled from 'styled-components'
import LinkList from '../components/LinkList'

export default function SnackbarModuleRoute () {
  return (
    <Wrapper>
      <h1>Snackbar Module</h1>

      <LinkList
        prev={['/user-module', 'User Module']}
        // next={['/', 'Test']}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;
`