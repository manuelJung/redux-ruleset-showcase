import * as React from 'react'
import { Router } from "@reach/router"

import IndexRoute from './routes/index'
import UserModule from './routes/user-module'

export default function App() {
  return (
    <div className="App">
      <Router>
        <IndexRoute path='/'/>
        <UserModule path='/user-module'/>
      </Router>
    </div>
  )
}
