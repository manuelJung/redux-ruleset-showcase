import * as React from 'react'
import styled from 'styled-components'
import {Link} from '@reach/router'
import {FiArrowLeft, FiArrowRight} from 'react-icons/fi'

export default function LinkList ({prev, next}) {
  return (
    <Wrapper>
      {prev ? <Link className='prev' to={prev[0]}><FiArrowLeft/> {prev[1]}</Link> : <div/>}
      <Link className='home' to='/'>Overview</Link>
      {next ? <Link className='next' to={next[0]}>{next[1]} <FiArrowRight/></Link> : <div/>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 80px 0;
  display: flex;
  > * {
    flex: 1;
    text-align: center;
    > svg {
      margin-bottom: -2px;
    }
  }
  > .prev { text-align: left;}
  > .next { text-align: right;}
`