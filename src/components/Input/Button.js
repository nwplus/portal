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
  border-radius: 3px;
  margin: 1em ${p => (!!p.no_margin ? '0px' : !!p.nav ? '0 1em 0.75em' : '0.75em')};
  :hover {
    cursor: pointer;
  }
  :focus {
    outline: 0;
  }
  ${p =>
    p.disabled &&
    `
    cursor: not-allowed;
    opacity: ${p.theme.opacity.disabled};
    `}
  ${p =>
    (p.color === 'primary' || !p.color) && // primary color (gradient button) or not specified color
    `color: ${p.theme.colors.button.text};
    background: ${p.theme.colors.button.background};
    // border: solid ${p.theme.colors.button.border} 2px;
    border-radius: 10px;

    :hover {
      // ${p.disabled ? `cursor: not-allowed;` : `filter: brightness(0.85);`}
      background: ${p.theme.colors.button.hoverbg};
      // border: solid ${p.theme.colors.button.hoverborder} 2px;
    }
    :focus {
      background: ${p.theme.colors.button.hoverbg};
  }`}
  ${(
    p // old style:       border: 2px solid transparent;
  ) =>
    p.color === 'secondary' && // secondary color (outline button)
    `color: ${p.theme.colors.button.outlineText};
    border-radius: 10px;
    background: ${p.theme.colors.button.outlineBackground};
    :hover {
      ${
        p.disabled
          ? `cursor: not-allowed;`
          : `background: ${hexToRgba(p.theme.colors.primary, 0.2)};`
      }
      color: ${p.theme.colors.button.outlineHover};
      background: ${p.theme.colors.button.outlineBackgroundHover};
    }
    :focus {
      color: ${p.theme.colors.button.text};
      background: ${p.theme.colors.button.outlineBackgroundHover};
    }`}
  ${p =>
    p.color === 'tertiary' && // tertiary color (solid button)
    `color: ${p.theme.colors.secondaryBackground};
    background: ${p.theme.colors.primary};
    :hover {
      ${p.disabled ? `cursor: not-allowed;` : `background: ${p.theme.colors.tertiaryHover};`}
    }
    :focus {
      box-shadow: 0 0 0 .2rem ${hexToRgba(p.theme.colors.primary, 0.5)};
    }`}
    ${p =>
    p.color === 'warning' && // warning color (solid button)
    `color: ${p.theme.colors.warning};
    border: 1px solid ${p.theme.colors.warning};
      :hover {
        ${
          p.disabled
            ? `cursor: not-allowed;`
            : `background: ${hexToRgba(p.theme.colors.secondaryWarning, 0.2)};`
        }
      }
      :focus {
        box-shadow: 0 0 0 .2rem ${hexToRgba(p.theme.colors.warning, 0.5)};
      }`}
    ${p =>
    p.color !== 'primary' &&
    p.color !== 'secondary' &&
    p.color !== 'tertiary' &&
    p.color !== 'warning' &&
    p.color && // some color other than the variants
    `color: ${p.labelColor || p.theme.colors.background};
      background: ${p.color};
      :hover {
        ${
          p.disabled
            ? `cursor: not-allowed;`
            : `background: ${p.hover || p.theme.colors.tertiaryHover};`
        }
      }
      :focus {
        box-shadow: 0 0 0 .2rem ${hexToRgba(p.theme.colors.primary, 0.5)};
      }`}
    
    ${p =>
    p.color === 'aurora' &&
    `
      color: #051439;
      border-radius: 20px;
      background: linear-gradient(to bottom, #FFD12C, #FE800B);
      transition:0.2s all cubic-bezier(.65,-0.01,.4,1);

      ${
        !p.disabled &&
        `
        :hover {
          opacity: 0.8;
          background: linear-gradient(to bottom, #FFD12C, #FE800B);
        }
        :focus {
          box-shadow: 0 0 0 .15rem ${hexToRgba('#FE800B', 0.5)};
        }
      `
      }
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
