import React from 'react'
import styled from 'styled-components'
import { maxWidthMediaQueries } from './Common'

const Container = styled.div`
  padding: 1.25em 20em 7.5em 7em;
  ${maxWidthMediaQueries('mobile')} {
    padding: 1.25em 14em 2em 1.25em;
  }
`

const Form = ({ children }) => {
  return <Container>{children}</Container>
}

export default Form
