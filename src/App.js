import * as React from 'react'
import { Router } from "@reach/router"
import Snackbar from './components/Snackbar'

import IndexRoute from './routes/index'
import UserModule from './routes/user-module'
import SnackbarModule from './routes/snackbar-module'
import Cancelation from './routes/cancelation'
import Mutation from './routes/mutation'
import UrlHydration from './routes/url-hydration'
import Tracking from './routes/tracking'

export default function App() {
  return (
    <div className="App">
      <Router>
        <IndexRoute path='/'/>
        <UserModule path='/user-module'/>
        <SnackbarModule path='/snackbar-module'/>
        <Cancelation path='/cancelation'/>
        <Mutation path='/mutation'/>
        <UrlHydration path='/url-hydration'/>
        <Tracking path='/tracking'/>
      </Router>
      <Snackbar/>
    </div>
  )
}
