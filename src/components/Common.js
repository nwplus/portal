import styled, { css } from 'styled-components'
import { P } from './Typography'
import { SCREEN_BREAKPOINTS } from '../utility/Constants'

export const maxWidthMediaQueries = size => {
  return `@media only screen and (max-width: ${SCREEN_BREAKPOINTS[size]}px)`
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
  font-family: ${p => p.theme.font};
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

export const TextInputLikeMsg = styled.p`
  color: ${p => p.theme.colors.highlight};
  margin: 0.5em 0em;
`

export const CenterHorizontally = css`
  margin: 0 50%;
  transform: translateX(-50%);
`
