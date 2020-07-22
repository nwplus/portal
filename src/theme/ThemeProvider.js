import React from 'react';
import { ThemeProvider } from 'styled-components'

const theme = {
  copy: '#fff'
}

export default ({children}) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)