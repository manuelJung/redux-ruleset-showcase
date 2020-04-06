import * as React from 'react'
import { Router } from "@reach/router"

import IndexRoute from './routes/index'

export default function App() {
  return (
    <div className="App">
      <Router>
        <IndexRoute path='/'/>
      </Router>
    </div>
  )
}
