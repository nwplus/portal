import React from 'react';
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#fff',
    primary: '#EEEEEE',
    highlight: '#4A5089',
    text: '#000',
    link: '#31E0E0',
    linkHover: '#222' //TODO
  },
  typography: {
    h1: {
      weight: 700,
      size: '2em',
    },
    h2: {
      weight: 600,
      size: '1.4em',
      opacity: 0.7,
    },
    h3: {
      weight: 600,
      size: '1em',
      opacity: 0.5,
    }
  }
}

export default ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
)