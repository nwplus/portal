import React from 'react'
import styled from 'styled-components'
import { H1 } from '../Typography'

const Container = styled.div`
  padding: 8vh 23vw;
  ${p => p.theme.mediaQueries.xs} {
    padding: 5vh 6vw;
  }
`

export const FormSpacing = styled.div`
  margin-bottom: 4em;
  ${p => p.theme.mediaQueries.xs} {
    margin-bottom: 2em;
  }
`

export const SubHeading = styled(H1)`
  && {
    ${p => p.color === 'primary' && `color: ${p.theme.colors.primary};`}
  }
  font-size: ${p => p.size || `1.5em`};
`

export default ({ children }) => {
  return <Container>{children}</Container>
}
