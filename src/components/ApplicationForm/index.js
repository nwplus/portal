import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 8vh 19vw;
  ${p => p.theme.mediaQueries.xs} {
    padding: 5vh 6vw;
  }
`

export const FormSpacing = styled.div`
  margin-bottom: 5em;
  ${p => p.theme.mediaQueries.xs} {
    margin-bottom: 2em;
  }
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
