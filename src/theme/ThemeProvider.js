import React from 'react';
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#2D2937',
    secondaryBackground: '#1D1B24',
    primary: '#31E0E0',
    highlight: '#fff',
    text: '#fff',
    link: 'rgba(255, 255, 255, 0.6)',
    linkHover: '#fff' //TODO
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