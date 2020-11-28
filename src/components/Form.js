import React from 'react'
import styled from 'styled-components'
import { maxWidthMediaQueries } from './Common'

const Container = styled.div`
  padding: 20px 325px 120px 115px;
  ${maxWidthMediaQueries('mobile')} {
    padding: 20px 230px 30px 20px;
  }
`

const Form = ({ children }) => {
  return <Container>{children}</Container>
}

export default Form
