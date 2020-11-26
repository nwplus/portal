import React from 'react'
import styled, { css } from 'styled-components'
import { text } from './Typography'
import { P } from './Typography'
import buttonBG from '../assets/hc_button.svg'

const screenBreakpoints = {
  xs: 576,
  mobile: 768,
  tablet: 992,
  desktop: 1200,
}

export const maxWidthMediaQueries = size => {
  return `@media only screen and (max-width: ${screenBreakpoints[size]}px)`
}

export const CardLike = css`
  padding: 2em;
  border-radius: 3px;
  background-color: ${p => p.theme.colors.secondaryBackground};
  margin: 2em 0;
`

export const Card = styled.div`
  ${CardLike};
`

const StyledButton = styled.a`
  ${text};
  display: block;
  text-decoration: none;
  font-family: 'HK Grotesk';
  font-weight: ${p => p.theme.typography.h2.weight};
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.background};
  text-align: center;
  width: 75px;
  padding: 0.75em 2.5em;
  border-radius: 3px;
  margin: 1em;

  ${p =>
    p.theme.custom_imgs === 'hc' &&
    `
      background: url(${buttonBG});
      background-size: contain;
      background-repeat: no-repeat;
    `}
`

export const Button = props => (
  <StyledButton href={props.href || '#!'} {...props}>
    {props.children}
  </StyledButton>
)

export const SecondaryButton = styled(Button)`
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.primary};
  border: 1px solid ${p => p.theme.colors.primary};
`

export const SearchBar = styled.input.attrs({
  type: 'text',
})`
  ${CardLike};
  width: 50%;
  padding: 12px 20px;
  margin: 8px 0;
  border: none;
  color: ${p => p.theme.colors.text};
`

export const DetailContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  ${maxWidthMediaQueries('desktop')} {
    display: block;
  }
`

export const DetailColumn = styled.ul`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 0;
  margin-right: 1em;
  padding: 0;

  & > li {
    ${CardLike};
    margin: 0;
    padding: 0.5em 1em;
    margin-bottom: 1em;
    list-style-type: none;
  }
`

export const DetailAnswer = styled(P)`
  margin-bottom: 0.85em;
`

export const HR = styled.hr`
  border: 1px solid ${p => p.theme.colors.border};
  margin: 3em 0;
`

export const TextInputLike = css`
  background-color: transparent;
  padding: 10px;
  border: 2px solid ${p => p.theme.colors.highlight};
  border-radius: 7px;
  color: ${p => p.theme.colors.primary};
  font-family: 'HK Grotesk';
  font-size: ${p => p.theme.typography.h3.size};
  ::placeholder {
    color: ${p => p.theme.colors.highlight};
  }
  :hover {
    border: 2px solid ${p => p.theme.colors.primary};
  }
  :focus {
    border: 2px solid ${p => p.theme.colors.primary};
    outline: none;
  }
  :disabled {
    border: 2px solid ${p => p.theme.colors.highlight};
    opacity: ${p => p.theme.opacity.disabled};
  }
  ${p =>
    p.invalid &&
    `border: 2px solid ${p.theme.colors.warning};
    ::placeholder {
      color: ${p.theme.colors.warning};
    }
    :hover {
      border: 2px solid ${p.theme.colors.secondaryWarning};
    }
    :focus {
      border: 2px solid ${p.theme.colors.secondaryWarning};
    }`}
`

export const TextInputLikeErrorMsg = styled.p`
  color: ${p => p.theme.colors.warning};
  margin: 0.5em 0em;
`
