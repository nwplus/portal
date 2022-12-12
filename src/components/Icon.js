import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.i`
  color: ${p => p.color || p.theme.colors.link};
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  text-shadow: 0px 0px 3px #588ae5;

  &:hover {
    color: ${p => p.color || p.theme.colors.secondaryBackgroundTransparent};
  }
`

export default ({ className, icon, color, brand, size, href }) => {
  const Elem = () => (
    <StyledIcon
      className={`${brand ? 'fab' : 'fas'} fa-${icon} ${className ? className : ''}${
        size && ' fa-' + size
      }`}
      color={color}
    />
  )

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <Elem />
    </a>
  ) : (
    <Elem />
  )
}
