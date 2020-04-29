import * as React from 'react'
import ReactGA from 'react-ga'
import {useLocation} from '@reach/router'

export default function Analytics () {
  const location = useLocation()
  const initialized = React.useRef(false)
  React.useEffect(() => {
    if(!initialized.current){
      ReactGA.initialize("UA-164982993-1")
      initialized.current = true
    }

    const page = location.pathname + location.search
    ReactGA.set({ page, location: `${location.origin}${page}` })
    ReactGA.pageview(page)
  }, [location.pathname, location.search, location.origin])


  return null
}