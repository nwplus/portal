import React from 'react'
import styled from 'styled-components'
import { maxWidthMediaQueries } from './Common'

const Container = styled.div`
  padding: 8vh 16vw;
  ${maxWidthMediaQueries('mobile')} {
    padding: 3vh 6vw;
  }
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
