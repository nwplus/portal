import styled, { css } from 'styled-components'
import { text } from './Typography'

export const CardLike = css`
  padding: 2em;
  border-radius: 3px;
  background-color: ${p => p.theme.colors.secondaryBackground};
  margin: 2em 0;
`

export const Card = styled.div`
  ${CardLike};
`

export const Button = styled.a`
  ${text};
  display: block;
  text-decoration: none;
  font-family: 'HK Grotesk';
  font-weight: 600;
  background: ${p => p.theme.colors.primary};
  color: ${p => p.theme.colors.background};
  text-align: center;
  width: 75px;
  padding: 0.75em 2.5em;
  border-radius: 3px;
  margin: 1em;
`

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
`