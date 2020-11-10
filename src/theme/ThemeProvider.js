import React from 'react'
import { ThemeProvider } from 'styled-components'

const theme = {
  colors: {
    background: '#2D2937',
    secondaryBackground: '#1D1B24',
    foreground: '#4F4A59',
    warning: '#EF6C6C',
    secondaryWarning: '#F18383',
    primary: '#31E0E0',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#31E0E0', //TODO
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
    },
  },
  opacity: {
    disabled: 0.5,
  },
}

export default ({ children }) => <ThemeProvider theme={theme}>{children}</ThemeProvider>
