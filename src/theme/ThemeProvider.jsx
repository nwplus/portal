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
    background: '#C8E5F0',
    backgroundSecondary: '#93BEE5',
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
    bar: '#00A4E0',
    barBackground: '#371315',

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
      mainEventTag: '#3268A5',
      workshopTag: '#DE0148',
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
    background: '#C8E5F0',
    backgroundSecondary: '#93BEE5',
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
    bar: '#00A4E0',
    barBackground: '#371315',

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
      mainEventTag: '#3268A5',
      workshopTag: '#DE0148',
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
const THEMES = { 'hackcamp': hackcampTheme, 'nwhacks': nwHacksTheme, 'cmd-f': cmdfTheme }

const ThemeProvider = ({ children }) => {
  const { activeHackathon } = useHackathon()
  const selectedTheme = THEMES[activeHackathon]

  return <TP theme={selectedTheme}>{children}</TP>
}

export default ThemeProvider
