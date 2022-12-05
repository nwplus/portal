import React from 'react'
import { ThemeProvider } from 'styled-components'

const SCREEN_BREAKPOINTS = {
  xs: 576,
  mobile: 768,
  tablet: 992,
  tabletLarge: 1024,
  desktop: 1200,
}

const base = {
  typography: {
    headerFont: 'HK Grotesk',
    bodyFont: 'HK Grotesk',
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
  mediaQueries: {
    xs: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.xs}px)`,
    mobile: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.mobile}px)`,
    tablet: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.tablet}px)`,
    tabletLarge: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.tabletLarge}px)`,
    desktop: `@media only screen and (max-width: ${SCREEN_BREAKPOINTS.desktop}px)`,
  },
}

const nwTheme = {
  ...base,
  name: 'nwHacks',
  colors: {
    background: '#544D92', //'linear-gradient(to bottom left, #C5ACE5, #454390)', // linear-gradient(to bottom, #52999F, #051439)
    card: '#182B47',
    border: 'rgba(255, 255, 255, 0.3)',
    secondaryBackgroundTransparent: '#10186Cbb', // before: #1D1B24bb
    secondaryBackground: '#635BA4',
    sidebar: {
      link: '#fff',
    },
    error: '#ff0033',
    success: '#629F5D',
    toastText: '#fff', // Color for text in toast messages (Toast.js)
    foreground: '#4F4A59',
    primary: '#10186C',
    default: '#BEBEBE',
    warning: '#F18383',
    secondaryWarning: '#EF6C6C',
    highlight: 'rgba(255, 255, 255, 0.5)',
    text: '#FFF',
    link: '#fff',
    linkHover: '#31E0E0', //TODO
    primaryGradient: 'linear-gradient(180deg, #FED9CD 0%, #CDCAEC 100%)', // button
    primaryGradientHover: 'linear-gradient(180deg, #76F4D6 0%, #18CDCD 100%, #44D0D0 100%)', // button hover
    tertiaryHover: '#1EEDC8', // button hover
    selects: {
      hover: 'rgba(197, 172, 229, 0.2)',
      focus: 'rgba(197, 172, 229, 0.4)',
      border: '#10186C',
      placeholder: '#10186C',
      text: '#fff',
    },
    button: {
      text: 'white',
      background: '#959AFB',
    },
    hover: '#D9FFF9',
    scrollbar: '#4F4A59',
    banner: 'rgba(75, 65, 130, 0.2)',
    login: {
      googleBg: '#fff',
      googleText: '#000',
      googleBgHover: '#fff',
      githubBg: '#051439',
      githubText: '#fff',
      githubBgHover: '#051439',
    },
  },
}

const hackcampTheme = {
  ...base,
  name: 'hackCamp',
  colors: {
    background: '#476C6E',
    card: '#1E4F5A',
    border: 'rgba(255, 255, 255, 0.3)',
    secondaryBackground: '#1E4F5A',
    secondaryBackgroundTransparent: '#FFBC9650',
    sidebar: {
      link: '#fff',
    },
    foreground: '#FFBC96',
    error: '#ff0033',
    success: '#629F5D',
    toastText: '#fff', // Color for text in toast messages (Toast.js)
    warning: '#FF8989',
    secondaryWarning: '#EF6C6C',
    primary: '#FFBC96',
    default: '#BEBEBE',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#FFBC96',
    tertiaryHover: '#AD795E', // button hover
    // Styling for schedule page
    schedule: {
      background: 'transparent',
      event: 'white',
      text: '#476C6E',
    },
    selects: {
      border: 'rgba(255, 255, 255, 0.5)',
      text: 'white',
      placeholder: 'rgba(255, 255, 255, 0.5)',
      hover: 'rgba(255, 255, 255, 0.2)',
      focus: 'white',
    },
    hover: '#A0B9C0',
    scrollbar: '#80959B',
    banner: '#476C6E',
    login: {
      googleHover: '#fafafa',
      githubHover: '#545159',
    },
  },
}

const cmdfTheme = {
  ...base,
  name: 'cmdf',
  colors: {
    background: '#FFF6D8',
    card: '#2C3933',
    cardText: '#ffffff',
    border: 'rgba(0, 0, 0, 0.3)',
    cardSecondary: '#C8BFB6',
    secondaryBackground: '#2C3933',
    secondaryBackgroundTransparent: '#EBC029',
    sidebar: {
      link: '#fff',
    },
    foreground: '#FFBC96',
    error: '#ff0033',
    success: '#629F5D',
    toastText: '#fff', // Color for text in toast messages (Toast.js)
    warning: '#FF8989',
    secondaryWarning: '#EF6C6C',
    primary: '#EBC029',
    secondary: '#FE800B',
    default: '#2C3933',
    highlight: '#192825',
    text: '#192825',
    link: '#3D995F',
    linkHover: '#2C3933',
    tertiaryHover: '#FE800B', // button hover
    // Styling for schedule page
    schedule: {
      background: '#FFF6D8',
      event: '#2C3933',
      text: '#FFFFFF',
    },
    selects: {
      border: '#2C3933',
      text: '#2C3933',
      hover: '#EBC029',
      disabled: 'rgba(0, 0, 0, 0.4)',
      selected: '#EBC029',
      placeholder: 'rgba(0, 0, 0, 0.4)',
    },
    hover: '#A0B9C0',
    scrollbar: '#80959B',
    banner: '#EBC029',
    login: {
      background: '#2C3933',
      text: '#fff',
      googleBg: '#fff',
      googleText: '#000',
      googleBgHover: 'rgba(255, 255, 255, 0.8)',
      githubBg: '#577079',
      githubText: '#fff',
      githubBgHover: 'rgba(87, 112, 121, 0.8)',
    },
  },
}

const THEMES = { nwTheme, hackcampTheme, cmdfTheme }
let selectedTheme = nwTheme

if (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_ENV === 'STAGING') {
  const localTheme = window.localStorage.getItem('localTheme')
  selectedTheme = localTheme ? THEMES[localTheme] : selectedTheme
}

export default ({ children }) => <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
