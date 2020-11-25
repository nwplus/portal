import React from 'react'
import styled from 'styled-components'
import { H2, P } from './Typography'
import { CardLike } from '../components/Common.js'
import { Button } from '../components/Button'

const MAX_CHARACTERS_IN_DESCRIPTION = 100

const StyledCard = styled.div`
  ${CardLike};
  padding: 0;
  max-width: 400px;
  margin: 0.5em 0;
`

const CardContent = styled.div`
  padding: 1em 2em 2em 2em;
`

const StyledImg = styled.img`
  max-width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin: 1em 0 0 0;
  box-sizing: border-box;
`

const Title = styled(H2)`
  margin: 0;
`

const TeamName = styled(P)`
  font-weight: bold;
  font-style: italic;
  padding-bottom: 1em;
`

const cutString = (string, maxLength) => {
  const cut = string.indexOf(' ', maxLength)
  if (cut === -1) {
    return string
  }
  return `${string.substring(0, cut)}...`
}

export default ({ imgUrl, title, teamName, description, buttonLabel, href = '#!' }) => {
  return (
    <StyledCard>
      <a href={href}>
        <StyledImg alt={title} src={imgUrl} />
      </a>
      <CardContent>
        <Title>{title}</Title>
        <TeamName>by {teamName}</TeamName>
        <P>{cutString(description, MAX_CHARACTERS_IN_DESCRIPTION)}</P>
        <StyledButton
          color="tertiary"
          href={href}
          target={href.includes('http') && '_blank'}
          rel="noreferrer noopener"
        >
          {buttonLabel}
        </StyledButton>
      </CardContent>
    </StyledCard>
  )
}
