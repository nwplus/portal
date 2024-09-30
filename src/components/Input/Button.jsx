import React from 'react'
import styled from 'styled-components'
import { hexToRgba } from '../../utility/utilities'

const buttonWidth = {
  small: '40px',
  default: '60px',
  large: '300px',
  flex: '',
}

const buttonHeightPadding = {
  short: '0.25em',
  default: '0.5em',
  tall: '1em',
}

const StyledButton = styled.a`
  vertical-align: middle;
  display: inline-block;
  box-shadow: 0 14px 28px rgba(27, 33, 48, 0.12), 0 10px 10px rgba(27, 33, 48, 0.08);
  text-decoration: none;
  font-family: ${p => p.theme};
  font-weight: ${p => p.theme.typography.h1.weight};
  border: transparent;
  transition: all 250ms;
  max-width: 100%;
  width: ${p => (p.width ? buttonWidth[p.width] : buttonWidth['default'])};
  text-align: center;
  padding: ${p => (p.height ? buttonHeightPadding[p.height] : buttonHeightPadding['default'])}
    0.75em;
  border-radius: 10px;
  margin: 1em ${p => (!!p.no_margin ? '0px' : !!p.nav ? '0 1em 0.75em' : '0.75em')};
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }

  ${p =>
    (p.color === 'primary' || !p.color) && // primary color (gradient button) or not specified color
    `color: ${p.theme.colors.button.primary.text};
    background: ${p.theme.colors.button.primary.background.default};

    :hover {
      ${
        p.disabled
          ? `cursor: not-allowed;`
          : `background: ${p.theme.colors.button.primary.background.hover};`
      }
    }
    :active {
      ${
        p.disabled
          ? `cursor: not-allowed;`
          : `background: ${p.theme.colors.button.primary.background.clicked};`
      }
    }
  `}
  ${p =>
    p.color === 'secondary' &&
    `color: ${p.theme.colors.button.secondary.text};
    background: ${p.theme.colors.button.secondary.background.default};
    border-radius: 10px;

    :hover {
      ${
        p.disabled
          ? `cursor: not-allowed;`
          : `background: ${p.theme.colors.button.secondary.background.hover};`
      }
    }
    :active {
      ${
        p.disabled
          ? `cursor: not-allowed;`
          : `background: ${p.theme.colors.button.secondary.background.clicked};`
      }
    }
  `}

  ${p =>
    p.color === 'warning' && // warning color (solid button)
    `color: ${p.theme.colors.button.warning.text};
    background: ${p.theme.colors.button.warning.background.default};
      :hover {
        ${
          p.disabled
            ? `cursor: not-allowed;`
            : `background: ${p.theme.colors.button.warning.background.hover};`
        }
      }
      :active {
        ${
          p.disabled
            ? `cursor: not-allowed;`
            : `background: ${p.theme.colors.button.warning.background.clicked};`
        }
      }
  `}
    ${p =>
    p.color !== 'primary' &&
    p.color !== 'secondary' &&
    p.color !== 'warning' &&
    p.color && // some color other than the variants
    `color: ${p.labelColor || p.theme.colors.button.primary.text};
      background: ${p.color || p.theme.colors.button.primary.background.default};
      :hover {
        ${
          p.disabled
            ? `cursor: not-allowed;`
            : `background: ${p.hover || p.theme.colors.button.primary.background.hover};`
        }
      }
    `}

    ${p =>
    p.disabled &&
    `cursor: not-allowed; 
      background: ${p.theme.colors.button.backgroundDisabled};
  `}
`

export const Button = props => {
  return (
    <StyledButton
      {...props}
      ref={props.customRef}
      tabIndex={props.disabled ? null : 0}
      href={props.disabled ? null : props.href}
    >
      {props.children}
    </StyledButton>
  )
}

export default Button
