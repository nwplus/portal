import React from 'react';
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#fff',
    primary: '#E4E3EB',
    highlight: '#4A5089',
    text: '#000',
  },
}

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)