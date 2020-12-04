import React from 'react'
import { ThemeProvider } from 'styled-components'

// eslint-disable-next-line
const nwTheme = {
  font: 'HK Grotesk',
  custom_imgs: 'none',
  colors: {
    background: '#2D2937',
    border: 'rgba(255, 255, 255, 0.3)',
    secondaryBackgroundTransparent: '#1D1B24bb',
    secondaryBackground: '#1D1B24',
    error: '#ff0033',
    errorText: '#fff',
    foreground: '#4F4A59',
    primary: '#06C1C0',
    default: '#BEBEBE',
    warning: '#F18383',
    secondaryWarning: '#EF6C6C',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#31E0E0', //TODO
    primaryGradient: 'linear-gradient(180deg, #4DE8C2 0%, #18CDCD 100%, #19CBCB 100%)', // button
    primaryGradientHover: 'linear-gradient(180deg, #76F4D6 0%, #18CDCD 100%, #44D0D0 100%)', // button hover
    tertiaryHover: '#1EEDC8', // button hover
    selects: {
      hover: 'rgba(77, 232, 194, 0.2)',
      focus: 'rgba(77, 232, 194, 0.4)',
    },
    hover: '#D9FFF9',
    scrollbar: '#4F4A59',
    banner: 'rgba(75, 65, 130, 0.2)',
    login: {
      googleHover: '#fafafa',
      githubHover: '#545159',
    },
    greetingBorder: '#000000',
    applicationCard: 'rgba(75, 65, 130, 0.2)',
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
  font: 'HK Grotesk',
  custom_imgs: 'hc',
  colors: {
    background: '#2A3C4A',
    border: 'rgba(255, 255, 255, 0.3)',
    secondaryBackground: '#577079',
    secondaryBackgroundTransparent: '#577079bb',
    foreground: '#FFBC96',
    error: '#ff0033',
    errorText: '#fff',
    warning: '#FF8989',
    secondaryWarning: '#EF6C6C',
    primary: '#FFBC96',
    default: '#BEBEBE',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#FFBC96',
    tertiaryHover: '#AD795E', // button hover
    selects: {
      hover: 'rgba(201, 149, 119, 0.2)',
      focus: 'rgba(201, 149, 119, 0.5)',
    },
    hover: '#A0B9C0',
    scrollbar: '#80959B',
    banner: 'rgba(75, 65, 130, 0.2)',
    login: {
      googleHover: '#fafafa',
      githubHover: '#545159',
    },
    greetingBorder: '#000000',
    applicationCard: 'rgba(75, 65, 130, 0.2)', // TODO
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
