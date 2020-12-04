import React from 'react'
import styled from 'styled-components'
import { maxWidthMediaQueries } from './Common'

const Container = styled.div`
  padding: 10vw 16vw;
  ${maxWidthMediaQueries('mobile')} {
    padding: 9vh 10vw;
  }
`
export const FormSpacing = styled.div`
  margin-bottom: 6em;
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
