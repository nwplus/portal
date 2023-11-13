import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.i`
  color: ${p => (p.color ? p.color : '#fff')};
  transition: color 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    opacity: 0.9;
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
