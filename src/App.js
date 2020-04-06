import * as React from 'react'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
import UserList from './components/UserList'
import Code from './components/Code'
hljs.registerLanguage('javascript', javascript)

const demoCode= `
// comment
console.log('foo)
`

export default function App() {
  const code = React.useRef()
  React.useEffect(() => {
    if(!code.current) return
    hljs.highlightBlock(code.current)
  })
  return (
    <div className="App">
      <Code content={demoCode}/>
      <UserList/>
    </div>
  )
}
