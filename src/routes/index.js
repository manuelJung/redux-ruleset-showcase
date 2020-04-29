import * as React from 'react'
import styled from 'styled-components'
import {Link} from '@reach/router'

const devtools = 'https://chrome.google.com/webstore/detail/redux-ruleset/diibnbdfcjddnpmlhakebmiabmhhmnii'

export default function IndexRoute () {
  return (
    <Wrapper>
      <h1>Redux Ruleset showcase</h1>

      <p>
        Welcome to the showcase of redux-ruleset. In this application you 
        will learn how advanced concepts of redux ruleset work and how to
        use the devtools to model your dataflow. 
      </p>

      <p>
        Before you start you should add the <a href={devtools} target='_blank'>ruleset-devtools</a> chrome
        plugin (Firefox not available yet). A basic understanding 
        of <a href='https://redux-ruleset.netlify.com/' target='_blank'>redux-ruleset</a> is also 
        helpfull but not required.
      </p>

      <ul>
        <li><Link to='/user-module'>The users module</Link></li>
        <li><Link to='/snackbar-module'>The snackbar module</Link></li>
        <li><Link to='/cancelation'>cancel actions</Link></li>
        <li><Link to='/mutation'>Action Mutations</Link></li>
        <li><Link to='/url-hydration'>Url Hydration</Link></li>
        <li><Link to='/sagas'>Sagas</Link></li>
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