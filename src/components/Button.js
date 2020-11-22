import React from 'react'
import styled from 'styled-components'
import buttonBG from '../assets/hc_button.svg'
import { hexToRgba } from '../utility/utilities'

const buttonSize = {
  small: '60px',
  default: '80px',
  large: '300px',
}

const buttonColors = ['primary', 'secondary', 'tertiary']

const StyledButton = styled.button`
  display: block;
  text-decoration: none;
  font-family: 'HK Grotesk';
  font-weight: ${p => p.theme.typography.h2.weight};
  border: transparent;
  transition: all 250ms;
  min-width: ${p => (p.size ? buttonSize[p.size] : buttonSize['default'])};
  text-align: center;
  padding: 0.75em;
  border-radius: 3px;
  margin: 1em;
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }
  :disabled {
    opacity: ${p => p.theme.opacity.disabled};
  }
  ${p =>
    (p.color === buttonColors[0] || !buttonColors.includes(p.color)) && // primary color (gradient button) or not specified color
    `color: ${p.theme.colors.background};
    background: ${p.theme.colors.primaryGradient};
    :hover {
      background: ${p.theme.colors.primaryGradientHover};
    }
    :disabled {
      background: ${p.theme.colors.primaryGradient};
    }
    ${
      p.theme.custom_imgs === 'hc' &&
      `
      background: url(${buttonBG});
      background-size: contain;
      background-repeat: no-repeat;
      width: 140px;
      :focus {
        box-shadow: 0 0 0 .2rem ${hexToRgba(p.theme.colors.primary, 0.2)};
      }
      `
    }
    `}
  ${p =>
    p.color === buttonColors[1] && // secondary color (outline button)
    `color: ${p.theme.colors.primary};
    background: ${hexToRgba(p.theme.colors.primary, 0)};
    border: 1px solid ${p.theme.colors.primary};
    :hover {
      background: ${hexToRgba(p.theme.colors.primary, 0.2)};
    }
    :focus {
      background: ${hexToRgba(p.theme.colors.primary, 0.5)};
    }
    :disabled {
      background: ${hexToRgba(p.theme.colors.primary, 0)};
    }`}
  ${p =>
    p.color === buttonColors[2] && // tertiary color (solid button)
    `color: ${p.theme.colors.background};
    background: ${p.theme.colors.primary};
    :hover {
      background: ${p.theme.colors.tertiaryHover};
    }
    :disabled {
      background: ${p.theme.colors.primary};
    }`}
`

export const Button = props => (
  <StyledButton href={props.href || '#!'} {...props}>
    {props.children}
  </StyledButton>
)

export default Button
