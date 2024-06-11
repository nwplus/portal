import React from 'react'
import styled from 'styled-components'
import { H1 } from '../Typography'

const Container = styled.div`
  padding: 8vh 23vw;
  ${p => p.theme.mediaQueries.tabletLarge} {
    padding: 5vh 15vw;
  }
  ${p => p.theme.mediaQueries.xs} {
    padding: 5vh 6vw;
  }
`

export const FormSpacing = styled.div`
  margin-bottom: 4em;
  ${p => p.theme.mediaQueries.tabletLarge} {
    margin-bottom: 2.5em;
  }
  ${p => p.theme.mediaQueries.xs} {
    margin-bottom: 1.5em;
  }
`

export const SubHeading = styled(H1)`
  && {
    ${p => p.color === 'primary' && `color: ${p.theme.colors.primary};`}
  }
  font-size: ${p => p.size || `1.5em`};
  ${p => p.theme.mediaQueries.tabletLarge} {
    font-size: ${p => p.size || `1.2em`};
  }
`

const ApplicationForm = ({ children }) => {
  return <Container>{children}</Container>
}

export default ApplicationForm
