import React from 'react'
import styled from 'styled-components'
import { Link } from 'wouter'
import { MAX_CHARACTERS_IN_DESCRIPTION } from '../../utility/Constants'
import { cutString } from '../../utility/utilities'
import { CardLike } from '../Common.js'
import { Button } from '../Input/Button'
import { H2, P } from '../Typography'

const StyledCard = styled.div`
  ${CardLike};
  padding: 0;
  max-width: 320px;
`

const StyledP = styled(P)`
  word-break: break-word;
  max-height: 150px;
  overflow: auto;
  margin-bottom: 10px;

  ::-webkit-scrollbar {
    width: 1px;
  }

  ::-webkit-scrollbar-track {
    background: ${p => p.theme.colors.secondaryBackground};
  }

  ::-webkit-scrollbar-thumb {
    background: ${p => p.theme.colors.primary};
  }
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
  height: 40%;
  object-fit: cover;
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
        <StyledP>{cutString(description, MAX_CHARACTERS_IN_DESCRIPTION)}</StyledP>
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
