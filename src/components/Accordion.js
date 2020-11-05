import React from 'react'
import styled from 'styled-components'
import { H3 } from './Typography'

const Accordion = styled.details`
  display: inline-block;
  width: 100%;
  cursor: pointer;

  & > summary:focus {
    outline: 0;
  }

  & > summary > * {
    display: inline-block;
  }
`

export default ({ heading, children }) => {
  return (
    <Accordion>
      <summary>
        <H3>{heading}</H3>
      </summary>
      {children}
    </Accordion>
  )
}
