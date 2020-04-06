import * as React from 'react'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

export default function App() {
  const code = React.useRef()
  React.useEffect(() => {
    if(!code.current) return
    hljs.highlightBlock(code.current)
  })
  return (
    <div className="App">
      Hello world
      <pre><code ref={code} className="language-javascript">
{`// foo
console.log('hello world')
`}
        </code></pre>
    </div>
  )
}
