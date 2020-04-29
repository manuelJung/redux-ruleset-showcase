import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

import { createHistory, LocationProvider } from "@reach/router"

let history = createHistory(window)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <LocationProvider history={history}>
        <App />
      </LocationProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
