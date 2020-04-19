import * as React from 'react'
import styled from 'styled-components'
import {Link} from '@reach/router'

export default function IndexRoute () {
  return (
    <Wrapper>
      <h1>Redux Ruleset showcase</h1>

      <p>
        Welcome to the showcase of redux-ruleset. In this application you 
        will learn how advanced concepts of redux ruleset work and how to
        use the devtools to model your dataflow. 
      </p>

      <ul>
        <li><Link to='/user-module'>The users module</Link></li>
        <li><Link to='/snackbar-module'>The snackbar module</Link></li>
        <li><Link to='/cancelation'>cancel actions</Link></li>
      </ul>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 600px;

  li {
    line-height: 30px;
  }
`