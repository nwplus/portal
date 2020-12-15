import React from 'react'
import styled from 'styled-components'

const ProgressBarContainer = styled.div`
  width: 11px;
  height: ${p => p.vHeight || 50}vh;
  border-radius: 17px;
  background-color: ${p => p.theme.colors.default};
  position: fixed;
  top: 50%;
  margin-top: ${p => (p.vHeight ? -p.vHeight / 2 : -25)}vh;
  margin-left: -12vw;
  ${p => p.theme.mediaQueries.xs} {
    display: none;
  }
`

const ProgressBarFill = styled.div`
  height: ${p => p.percent}%;
  width: 100%;
  background-color: ${p => p.theme.colors.primary};
  border-radius: inherit;
  transition: height 0.3s ease-in;
`

const VerticalProgressBar = ({ percent, vHeight }) => {
  return (
    <ProgressBarContainer vHeight={vHeight}>
      <ProgressBarFill percent={percent} />
    </ProgressBarContainer>
  )
}

export default VerticalProgressBar
