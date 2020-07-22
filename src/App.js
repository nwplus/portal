import React from 'react';
import styled from 'styled-components'
import GlobalStyle from './theme/GlobalStyle'
import ThemeProvider from './theme/ThemeProvider'

const ExampleText = styled.div`
  color: ${p => p.theme.copy}
`

function App() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <GlobalStyle />
        <ExampleText>Live website.</ExampleText>
      </ThemeProvider>
    </React.Fragment>
  );
}

export default App;
