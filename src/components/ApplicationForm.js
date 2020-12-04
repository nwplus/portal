import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 8vh 16vw;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 3vh 6vw;
  }
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
