import * as React from 'react'
import styled from 'styled-components'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

export default function Code ({content}) {
  const code = React.useRef()
  React.useEffect(() => {
    if(!code.current) return
    hljs.highlightBlock(code.current)
  },[content])
  return (
    <Wrapper>
      <pre>
        <code ref={code} className="language-javascript">
          {content}
        </code>
      </pre>
    </Wrapper>
  )
}

const Wrapper = styled.div``