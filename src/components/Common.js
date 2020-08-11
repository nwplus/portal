import styled, { css } from 'styled-components'
import { text } from './Typography'

export const Card = styled.div`
  padding: 1em;
  border-radius: 3px;
  background-color: ${p => p.theme.colors.primary};
`

export const Button = styled.button`
  ${text};
  cursor: pointer;
  background: ${p => p.theme.colors.highlight};
  color: ${p => p.theme.colors.background};
  padding: 1em;
  border: none;
  border-radius: 3px;
  margin-right: 1.5em;
`

export const SecondaryButton = styled(Button)`
  background: ${p => p.theme.colors.background};
  color: ${p => p.theme.colors.highlight};
  border: 1px solid ${p => p.theme.colors.highlight};
  padding: calc(1em - 1px);
`