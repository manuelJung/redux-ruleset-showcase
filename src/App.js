import * as React from 'react'
import { Router } from "@reach/router"
import Snackbar from './components/Snackbar'

import IndexRoute from './routes/index'
import UserModule from './routes/user-module'
import SnackbarModule from './routes/snackbar-module'
import CancelationModule from './routes/cancelation'

export default function App() {
  return (
    <div className="App">
      <Router>
        <IndexRoute path='/'/>
        <UserModule path='/user-module'/>
        <SnackbarModule path='/snackbar-module'/>
        <CancelationModule path='/cancelation'/>
      </Router>
      <Snackbar/>
    </div>
  )
}
