import React from 'react'
import { ThemeProvider } from 'styled-components'

// eslint-disable-next-line
const nwTheme = {
  custom_imgs: 'none',
  colors: {
    background: '#2D2937',
    secondaryBackgroundTransparent: '#1D1B24bb',
    secondaryBackground: '#1D1B24',
    foreground: '#4F4A59',
    primary: '#31E0E0', // #06C1C0 for hacker app but these look visually close
    default: '#BEBEBE', // default-state border color for most components used in the hacker app
    warning: '#F18383',
    secondaryWarning: '#EF6C6C',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#31E0E0', //TODO
    selects: {
      hover: 'rgba(77, 232, 194, 0.2)',
      focus: 'rgba(77, 232, 194, 0.5)',
    },
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

const hackcampTheme = {
  custom_imgs: 'hc',
  colors: {
    background: '#2A3C4A',
    secondaryBackground: '#577079',
    secondaryBackgroundTransparent: '#577079bb',
    foreground: '#FFBC96',
    warning: '#FF8989',
    secondaryWarning: '#EF6C6C',
    primary: '#FFBC96',
    default: '#BEBEBE',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#FFBC96',
    selects: {
      hover: 'rgba(201, 149, 119, 0.2)',
      focus: 'rgba(201, 149, 119, 0.5)',
    },
  },
  typography: {
    h1: {
      weight: 700,
      size: '2em',
    },
    h2: {
      weight: 600,
      size: '1.4em',
      opacity: 0.9,
    },
    h3: {
      weight: 600,
      size: '1em',
      opacity: 0.7,
    },
  },
  opacity: {
    disabled: 0.5,
  },
}

const THEMES = { nwTheme, hackcampTheme }

let selectedTheme = hackcampTheme

if (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_ENV === 'STAGING') {
  const localTheme = window.localStorage.getItem('localTheme')
  selectedTheme = localTheme ? THEMES[localTheme] : selectedTheme
}

export default ({ children }) => <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
