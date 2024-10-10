import React from 'react'
import { ThemeProvider as TP } from 'styled-components'
import { useHackathon } from '../utility/HackathonProvider'

const SCREEN_BREAKPOINTS = {
  xs: 576,
  mobile: 768,
  tablet: 992,
  tabletLarge: 1024,
  desktop: 1200,
}

const base = {
  typography: {
    headerFont: 'Hanken Grotesk',
    bodyFont: 'Hanken Grotesk',
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

const hackcampTheme = {
  ...base,
  name: 'hackcamp',
  colors: {
    background: 'linear-gradient(0deg, #94D6EF, #94D6EF)',
    backgroundSecondary: '#75AEE2',
    backgroundTertiary: 'linear-gradient(180deg, #F9C745 0%, #FF880F 100%)',
    text: '#45171A',
    textSecondary: '#01033D',
    highlight: '#45171A',
    warning: '#D04E51',
    error: '#E03131',
    scrollbar: '#FFFFFF',
    required: '#D04E51',
    link: '#FBBC05',
    linkHover: '#75AEE2',
    lines: '#45171A',

    // sidebar
    sidebar: {
      background: 'linear-gradient(191.3deg, #CF0A1F -57.93%, #5B0B4C 78.18%)',
      backgroundSecondary: 'transparent',
      textSectionHeader: '#F9C745',
      textSelected: '#FFFFFF',
      textDefault: '#EBEBEB',
      backgroundSelected: '#A8138C',
      textHover: '#FFFFFF',
      backgroundHover: '#910F79',
    },

    // buttons
    button: {
      primary: {
        text: '#45171A',
        background: {
          default: 'linear-gradient(90deg, #F9C745 0%, #F7891A 100%)',
          hover: 'linear-gradient(90deg, #FFE090 0%, #FFA549 100%)',
          clicked: 'linear-gradient(90deg, #E6B63A 0%, #EE851A 100%)',
        },
      },
      secondary: {
        text: '#45171A',
        background: {
          default: '#F9C745',
          hover: '#FFD569',
          clicked: '#E4B63F',
        },
      },
      warning: {
        text: '#FFFFFF',
        background: {
          default: '#E03131',
          hover: '#b52828',
          clicked: '#c92c2c',
        },
      },
      backgroundDisabled: '#BDBAC3',
    },

    // schedule
    schedule: {
      background:
        'linear-gradient(180deg, rgba(0, 163, 224, 0.6) 0%, rgba(255, 248, 229, 0.6) 99.98%)',
      mainEventTag: '#00A3E0',
      workshopTag: '#F3F3F3',
      activityTag: '#A9158D',
      lines: '#FFFFFF',
    },

    // form elements
    input: {
      border: '#45171A',
      hover: '#A9158D',
      disabled: '#B0B0B0',
    },
    select: {
      border: '#45171A',
      background: {
        default: 'transparent',
        hover: '#75AEE2',
      },
    },
    dropdown: {
      background: {
        selected: '#75AEE2',
        hover: '#669fd4',
      },
    },

    // auth
    login: {
      googleAuthBackground: '#FFFFFF',
      googleAuthBackgroundHover: '#edebeb',
      googleAuthText: '#2A3C4A',
      githubAuthText: '#FFFFFF',
      githubAuthBackground: '#2A3C4A',
      githubAuthBackgroundHover: '#21313d',
    },

    // misc
    faq: {
      toggle: '#45171A',
    },
  },
}

const nwHacksTheme = {
  ...base,
  name: 'nwhacks',
  colors: {
    background: '#3C4BA5', // Background
    card: '#0A1361', // BG Accent
    border: 'rgba(255, 255, 255, 0.3)',
    secondaryBackgroundTransparent: '#F0EEF299',
    secondaryBackgroundTransparentHover: '#9D9FAD',
    secondaryBackground: '#5667CF', // Side bar background
    sidebar: {
      background: '#5667CF',
      hover: '#0A1361',
      selected: '#3C4BA5',
      primary: '#FFF',
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
      outlineText: '#FFF', // Secondary button
      outlineHover: '#FFFFFF', // secondary
      outlineBackground: '#A4A9F1', //secondary button
      outlineBackgroundHover: 'linear-gradient(265.48deg, #D9DBFF 3.67%, #CCF2F9 78.93%)',
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

const cmdfTheme = {
  ...base,
  name: 'cmd-f',
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
    default: '#FFFFFF',
    highlight: '#192825',
    text: '#FFFFFF',
    link: '#3D995F',
    linkHover: '#CAD1F7',
    tertiaryHover: '#CAD1F7', // button hover
    // Styling for schedule page
    schedule: {
      background: 'linear-gradient(0deg, #404871 100%, #58618C 80%, #949ABA 20%)',
      event: 'white',
      text: '#F0EEF2', //greyscale
      timestamp: '#48FFF4',
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

// change when we do the rest of the reskins
const THEMES = { 'hackcamp': hackcampTheme, 'nwhacks': hackcampTheme, 'cmd-f': hackcampTheme }

const ThemeProvider = ({ children }) => {
  const { activeHackathon } = useHackathon()
  const selectedTheme = THEMES[activeHackathon]

  return <TP theme={selectedTheme}>{children}</TP>
}

export default ThemeProvider
