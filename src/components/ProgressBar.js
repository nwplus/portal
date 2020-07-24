import React from 'react';
import styled from 'styled-components'

const ProgressBarContainer = styled.div`
  color: ${p => p.theme.colors.text};
  display: flex;
  height: 15px;
  margin: 1em;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${p => p.theme.colors.primary};
`

// filled part of progress bar
const FlexPrimary = styled.div`
  flex: 0 0 ${p => p.percent * 100}%;
  background-color: ${p => p.theme.colors.highlight};
`

// rest of progress bar
const FlexSecondary = styled.div`
  background-color: ${p => p.theme.colors.primary};
`

const ProgressBar = ({current, total}) => {
    return (
        <ProgressBarContainer>
            <FlexPrimary percent={current / total}/>
            <FlexSecondary />
        </ProgressBarContainer>
    );
}

export default ProgressBar