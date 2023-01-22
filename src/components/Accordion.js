import React from 'react'
import styled from 'styled-components'
import { H3 } from './Typography'

const Accordion = styled.details`
  display: inline-block;
  width: 100%;
  cursor: ${p => (p?.cursor ? p.cursor : 'pointer')};

  & > summary:focus {
    outline: 0;
  }

  & > summary > * {
    display: inline-block;
  }
`

const StyledH3 = styled(H3)`
  opacity: 1;
`

export default ({ heading, children, cursor }) => {
  return (
    <Accordion cursor={cursor}>
      <summary>
        <StyledH3>{heading}</StyledH3>
      </summary>
      {children}
    </Accordion>
  )
}
