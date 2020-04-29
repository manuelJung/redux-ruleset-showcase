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
import Sagas from './routes/sagas'
import Analytics from './components/Analytics'

export default function App() {
  return (
    <div className="App">
      {process.env.NODE_ENV === 'production' && <Analytics/>}
      <Router>
        <IndexRoute path='/'/>
        <UserModule path='/user-module'/>
        <SnackbarModule path='/snackbar-module'/>
        <Cancelation path='/cancelation'/>
        <Mutation path='/mutation'/>
        <UrlHydration path='/url-hydration'/>
        <Tracking path='/tracking'/>
        <Sagas path='/sagas'/>
      </Router>
      <Snackbar/>
    </div>
  )
}
