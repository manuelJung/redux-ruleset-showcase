import * as React from 'react'
import styled from 'styled-components'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/highlight'
import javascript from 'highlight.js/lib/languages/javascript'
hljs.registerLanguage('javascript', javascript)

export default function Code ({content, trim=0}) {
  const code = React.useRef()

  const formattedContent = React.useMemo(() => {
    return content
      .split('\n')
      .map(row => row.slice(trim))
      .join('\n')
  }, [content, trim])
  
  React.useEffect(() => {
    if(!code.current) return
    hljs.highlightBlock(code.current)
  },[content])

  return (
    <Wrapper>
      <pre>
        <code ref={code} className="language-javascript">
          {formattedContent}
        </code>
      </pre>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  text-align: left;
  font-size: 14px;
`