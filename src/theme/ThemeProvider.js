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
    background: '#193545', // Background
    card: '#0A1C27', // BG Accent
    border: '#8E7EB4',
    secondaryBackgroundTransparent: '#F0EEF299',
    secondaryBackgroundTransparentHover: '#9D9FAD',
    secondaryBackground: '#244556', // Side bar background
    sidebar: {
      background: '#193545',
      hover: '#244556',
      selected: '#244556',
      primary: '#DCB551',
      secondary: '#9D9FAD',
      link: '#9D9FAD',
      statusText: '#9D9FAD',
    },
    error: '#ff0033',
    success: '#629F5D',
    toastText: '#fff', // Color for text in toast messages (Toast.js)
    foreground: '#F0EEF2',
    primary: '#FFBF76',
    default: '#FFFFFF',
    warning: '#F18383',
    secondaryWarning: '#E03131',
    highlight: 'rgba(255, 255, 255, 0.5)',
    text: '#FFF',
    link: '#fff',
    linkHover: '#31E0E0', //TODO
    primaryGradient: 'linear-gradient(180deg, #150C27 0%, #150C27 100%)', //'linear-gradient(180deg, #FED9CD 0%, #CDCAEC 100%)', // button
    primaryGradientHover: 'linear-gradient(263.82deg, #E9C3CB 38.58%, #A4A9F1 78.17%)', //'linear-gradient(180deg, #76F4D6 0%, #18CDCD 100%, #44D0D0 100%)', // button hover
    tertiaryHover: '#1EEDC8', // button hover
    selects: {
      hover: '#5667CF',
      focus: 'rgba(197, 172, 229, 0.4)',
      border: '#0B1361', //  Text input form
      placeholder: '#CFD6FF', // Placeholder text in form
      text: '#fff',
    },
    button: {
      // Application form buttons
      text: '#191C4F', // For primary button
      background: 'linear-gradient(265.48deg, #959AFB 3.67%, #9AD4DE 78.93%)', // Primary button
      border: '#9AD4DE',
      hoverbg: ' linear-gradient(265.48deg, #D9DBFF 3.67%, #CCF2F9 78.93%)',
      hoverborder: '#A4A9F1',
      outlineText: '#191C4F', // Secondary button
      outlineHover: '#FFFFFF', // secondary
      outlineBackground: '#DCB551', //secondary button
      outlineBackgroundHover: 'linear-gradient(265.48deg, #244556 3.67%, #244556 78.93%)',
      outlineBorder: '#CFD6FF',
      grey500: '#BDBAC3',
      grey700: '#55525B',
    },
    schedule: {
      background: 'linear-gradient(0deg, #244556 100%, #33515E 80%, #244556 20%)',
      event: 'white',
      text: '#F0EEF2', //greyscale
      timestamp: '#DCB551',
    },
    hover: '#D9FFF9',
    scrollbar: '#5F8CA2',
    banner: 'rgba(0,0,0,0)',
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
    background: '#150C27',
    card: '#433860',
    cardText: '#191C4F',
    border: 'rgba(255, 255, 255, 0.3)',
    secondaryBackground: '#150C27',
    secondaryBackgroundTransparent: '#fff',
    sidebar: {
      link: '#F0EEF299',
    },
    foreground: '#FFFFFF',
    error: '#ff0033',
    success: '#629F5D',
    toastText: '#fff', // Color for text in toast messages (Toast.js)
    warning: '#FF8989',
    secondaryWarning: '#EF6C6C',
    primary: '#FFBF76',
    accent: '#F6922B',
    default: '#FFFFFF',
    highlight: 'rgba(255, 255, 255, 0.6)',
    text: '#fff',
    link: '#fff',
    linkHover: '#FFFFFF',
    tertiaryHover: '#AD795E', // button hover
    // Styling for schedule page
    schedule: {
      background: '#433860', // schedule container bg
      event: '#140D30', // event container bg
      text: '#fff', // title bg
      description: '#fff', // text description
      timestamp: '#FFBF76', // timestamp text
    },
    selects: {
      border: 'rgba(255, 255, 255, 0.5)',
      text: 'white',
      placeholder: 'rgba(255, 255, 255, 0.5)',
      hover: 'rgba(255, 255, 255, 0.2)',
      focus: 'white',
    },
    button: {
      outlineText: '#433860', // Secondary button
      outlineBackground: '#FFBF76',
      outlineBackgroundHover: '#F6922B',
    },
    hover: '#A0B9C0',
    scrollbar: '#80959B',
    banner: 'transparent',
    login: {
      googleBg: '#fff',
      googleText: '#000',
      googleBgHover: '#fff',
      githubBg: '#577079',
      githubText: '#fff',
      githubBgHover: '#577079',
    },
  },
}

const cmdfTheme = {
  ...base,
  name: 'cmdf',
  colors: {
    background: '#5968A6',
    card: '#323858', // BG Accent
    cardText: '#ffffff',
    border: 'rgba(0, 0, 0, 0.3)',
    cardSecondary: '#C8BFB6',
    secondaryBackground: '#323858',
    // secondaryBackgroundTransparent: '#EBC02910',
    secondaryBackgroundTransparent: '#F1E9DF',
    sidebar: {
      background: '#323858',
      secondary: '#FFFFFF',
      link: '#CAD1F7',
      hover: '#5968A6',
      primary: '#48FFF4',
    },
    foreground: '#FFFFFF',
    error: '#ff0033',
    success: '#629F5D',
    toastText: '#fff', // Color for text in toast messages (Toast.js)
    warning: '#FF8989',
    secondaryWarning: '#EF6C6C',
    primary: '#48FFF4',
    secondary: '#CAD1F7',
    primaryGradient: '#82B185',
    primaryGradientHover: '#CAD1F7',
    default: '#323858',
    highlight: '#192825',
    text: '#FFFFFF',
    link: '#3D995F',
    linkHover: '#2C3933',
    tertiaryHover: '#CAD1F7', // button hover
    // Styling for schedule page
    schedule: {
      background: 'linear-gradient(0deg, #404871 100%, #58618C 80%, #949ABA 20%)',
      event: 'white',
      text: '#F0EEF2', //greyscale
      timestamp: '#DCB551',
    },
    selects: {
      border: '#CAD1F7',
      text: '#FFFFFF',
      hover: '#48FFF4',
      disabled: 'rgba(0, 0, 0, 0.4)',
      selected: '#48FFF4',
      placeholder: 'rgba(0, 0, 0, 0.4)',
    },
    button: {
      // Application form buttons
      text: '#0A1361', // For primary button
      background: '#5968A6', // Primary button
      border: '#9AD4DE',
      hoverbg: '#CAD1F7',
      hoverborder: '#A4A9F1',
      outlineText: '#FFFFFF', // Secondary button
      outlineBackground: '#5968A6',
      outlineBackgroundHover: '#48FFF4',
      outlineBorder: '#CFD6FF',
      grey500: '#BDBAC3',
      grey700: '#55525B',
    },
    hover: '#A0B9C0',
    scrollbar: '#5F8CA2',
    banner: 'transparent',
    login: {
      background: '#C0A68B',
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
let selectedTheme = cmdfTheme

if (process.env.NODE_ENV !== 'production' || process.env.REACT_APP_ENV === 'STAGING') {
  // const localTheme = window.localStorage.getItem('localTheme')
  const localTheme = null
  selectedTheme = localTheme ? THEMES[localTheme] : selectedTheme
}

export default ({ children }) => <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>
