import React from 'react'
import styled from 'styled-components'
import { Link } from 'wouter'
import { H2, P } from '../Typography'
import { CardLike } from '../Common.js'
import { Button } from '../Input/Button'

const MAX_CHARACTERS_IN_DESCRIPTION = 100

const StyledCard = styled.div`
  ${CardLike};
  padding: 0;
  max-width: 320px;
`

const CardContent = styled.div`
  padding: 1em 2em 2em 2em;
  height: 220px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`

const StyledImg = styled.img`
  width: 100%;
`

const StyledButton = styled(Button)`
  width: 100%;
  margin: auto 0 0 0;
  box-sizing: border-box;
`

const Title = styled(H2)`
  margin: 0;
  margin-bottom: 0.5em;
`

const cutString = (string, maxLength) => {
  const cut = string.indexOf(' ', maxLength)
  if (cut === -1) {
    return string
  }
  return `${string.substring(0, cut)}...`
}

export default ({
  imgUrl,
  title,
  description,
  buttonLabel,
  buttonDisabled,
  className,
  href = '#!',
}) => {
  return (
    <StyledCard className={className}>
      <a href={href}>
        <StyledImg alt={title} src={imgUrl} />
      </a>
      <CardContent>
        <Title>{title}</Title>
        <P>{cutString(description, MAX_CHARACTERS_IN_DESCRIPTION)}</P>
        {href.includes('http') ? (
          <StyledButton
            color="tertiary"
            href={href}
            disabled={buttonDisabled}
            target="blank"
            rel="noreferrer noopener"
          >
            {buttonLabel}
          </StyledButton>
        ) : buttonDisabled ? (
          <StyledButton color="tertiary" disabled>
            {buttonLabel}
          </StyledButton>
        ) : (
          <Link href={href}>
            <StyledButton color="tertiary">{buttonLabel}</StyledButton>
          </Link>
        )}
      </CardContent>
    </StyledCard>
  )
}
