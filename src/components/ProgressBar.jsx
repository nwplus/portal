import React from 'react'
import styled from 'styled-components'

const ProgressBarContainer = styled.div`
  color: ${p => p.theme.colors.text};
  display: flex;
  height: 15px;
  margin: 1em 0;
  border-radius: 3px;
  overflow: hidden;
  border: 2px solid ${p => p.theme.colors.secondaryBackground};
  background-color: ${p => p.theme.colors.secondaryBackground};
`

// filled part of progress bar
const ProgressFilled = styled.div`
  flex: 0 0 ${p => p.percent}%;
  background-color: ${p => p.theme.colors.primary};
`

// rest of progress bar
const ProgressUnfilled = styled.div``

const ProgressBar = ({ percent }) => {
  return (
    <ProgressBarContainer>
      <ProgressFilled percent={percent} />
      <ProgressUnfilled />
    </ProgressBarContainer>
  )
}

export default ProgressBar
