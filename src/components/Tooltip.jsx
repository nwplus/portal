import React from 'react'
import styled from 'styled-components'

const TooltipText = styled.span`
  visibility: hidden;
  width: 300px;
  background-color: black;
  color: white;
  font-size: 16px;
  text-align: center;
  border-radius: 6px;
  padding: 12px;
  position: absolute;
  z-index: 999;
  top: -5px;
  left: 105%;
  opacity: 0;
  transition: opacity 0.3s;
`

const TooltipWrapper = styled.div`
  position: relative;
  display: inline-block;
  &:hover {
    ${TooltipText} {
      visibility: visible;
      opacity: 1;
    }
  }
`

function Tooltip({ text, children }) {
  return (
    <TooltipWrapper>
      {children}
      <TooltipText>{text}</TooltipText>
    </TooltipWrapper>
  )
}

export default Tooltip
