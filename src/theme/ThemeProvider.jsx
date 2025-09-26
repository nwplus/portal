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
    background: '#DFEDFF',
    backgroundSecondary: '#C3DFBB',
    backgroundTertiary: '#B4CFF2',
    text: '#203219',
    textSecondary: '#091803',
    highlight: '#45171A',
    warning: '#D91613',
    error: '#D91613',
    scrollbar: '#B4CFF2',
    required: '#D91613',
    link: '#FF9D66',
    linkHover: '#75AEE2',
    lines: '#304428',
    bar: '#00A4E0',
    barBackground: '#371315',

    // sidebar
    sidebar: {
      background: '#304428',
      backgroundSecondary: 'transparent',
      textSectionHeader: '#D2E6AD',
      textSelected: '#FFFFFF',
      textDefault: '#EBEBEB',
      backgroundSelected: '#D94713',
      textHover: '#FFFFFF',
      backgroundHover: '#D94713',
    },

    // buttons
    button: {
      primary: {
        text: '#FBEEF2',
        background: {
          default: '#D85475',
          hover: '#D85475',
          clicked: '#D85475',
        },
      },
      secondary: {
        text: '#FBEEF2',
        background: {
          default: '#2C6D7D',
          hover: '#2C6D7D',
          clicked: '#2C6D7D',
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
      background: 'linear-gradient(180deg, #DFEDFF 0%, #C2DCFF 100%)',
      mainEventTag: '#2C6D7D',
      workshopTag: '#D85475',
      activityTag: '#DB693B',
      lines: '#FFFFFF',
    },

    // form elements
    input: {
      border: '#102809',
      hover: '#2C6D7D',
      disabled: '#B0B0B0',
    },
    select: {
      border: '#082A0B',
      background: {
        default: 'transparent',
        hover: '#75AEE2',
      },
    },
    dropdown: {
      background: {
        selected: '#ACCBA3',
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
      toggle: '#304428',
    },
    qrCodeText: '#45171A',
  },
}

const nwHacksTheme = {
  ...base,
  name: 'nwhacks',
  colors: {
    background: '#EDDECC',
    backgroundSecondary: '#E2D0BA',
    backgroundTertiary: '#FFEDD7',
    text: '#3A2F21',
    textSecondary: '#01033D',
    highlight: '#30C55A',
    warning: '#D04E51',
    error: '#E03131',
    scrollbar: '#FFFFFF',
    required: '#D04E51',
    link: '#F3BC1C',
    linkHover: '#75AEE2',
    lines: '#45171A', // ask design for a variable (for gamification)
    bar: '#00A4E0', // ask design for a variable (for gamification)
    barBackground: '#371315', // ask design for a variable (for gamification)

    // sidebar
    sidebar: {
      background: 'linear-gradient(191.3deg, #77CFDC -57.93%, #23A2CE 78.18%)',
      backgroundSecondary: 'transparent',
      textSectionHeader: '#F9C745',
      textSelected: '#FFFFFF',
      textDefault: '#EBEBEB',
      backgroundSelected: '#1A94BC',
      textHover: '#FFFFFF',
      backgroundHover: '#1A94BC',
    },

    // buttons
    button: {
      primary: {
        text: '#3A2F21',
        background: {
          default: 'linear-gradient(90deg, #F1BC3E 26.5%, #ECB32A 100%)',
          hover: 'linear-gradient(90deg, #F7D175 0%, #FBC951 100%)',
          clicked: 'linear-gradient(90deg, #F3BC3A 0%, #DDA419 100%)',
        },
      },
      secondary: {
        text: '#45171A',
        background: {
          default: '#F3C241',
          hover: '#FFD569', // missing
          clicked: '#E4B63F', // mising
        },
      },
      warning: {
        text: '#FFFFFF',
        background: {
          default: '#E03131',
          hover: '#B52828',
          clicked: '#C92C2C',
        },
      },
      backgroundDisabled: '#C9C2BF',
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
      disabled: '#B0B0B066',
    },
    select: {
      border: '#453017',
      background: {
        default: 'transparent',
        hover: '#D4BEA4',
      },
    },
    dropdown: {
      background: {
        selected: '#D4BEA4',
        hover: '#E2D0BA',
      },
    },

    // auth
    login: {
      googleAuthBackground: '#FFFFFF',
      googleAuthBackgroundHover: '##FB8EAD',
      googleAuthText: '#2A3C4A',
      githubAuthText: '#FFFFFF',
      githubAuthBackground: '#577079',
      githubAuthBackgroundHover: '#3A9BBE',
    },

    // misc
    faq: {
      toggle: '#45171A',
    },
    qrCodeText: '#3A2F21',
  },
}

const cmdfTheme = {
  ...base,
  name: 'cmd-f',
  colors: {
    background: '#F0E9D7',
    backgroundSecondary: '#E2D0BA',
    backgroundTertiary: '#D9C5AC',
    text: '#4F2F22',
    textSecondary: '#453017',
    highlight: '#757651',
    warning: '#D04E51',
    error: '#A6321E',
    scrollbar: '#CAB69D',
    required: '#D04E51',
    link: '#F3BC1C',
    linkHover: '#75AEE2',
    lines: '#45171A',
    bar: '#00A4E0',
    barBackground: '#371315',

    // sidebar
    sidebar: {
      background: '#4F2F22',
      backgroundSecondary: 'transparent',
      textSectionHeader: '#E5CEAD',
      textSelected: '#4F2F22',
      textDefault: '#EBEBEB',
      backgroundSelected: '#D9C5AC',
      textHover: '#4F2F22',
      backgroundHover: '#D9C5AC',
    },

    // buttons
    button: {
      primary: {
        text: '#F0E9D7',
        background: {
          default: '#456774',
          hover: '#5c8899',
          clicked: '#7199a8',
        },
      },
      secondary: {
        text: '#F0E9D7',
        background: {
          default: '#A6321E',
          hover: '#ad4b39',
          clicked: '#c46b5a',
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
      background: 'linear-gradient(180deg, #F0E9D7 0%, #DECBB4 99.98%)',
      mainEventTag: '#5B849F',
      workshopTag: '#D53A1A',
      activityTag: '#757651',
      lines: '#8C5C48',
    },

    // form elements
    input: {
      border: '#45171A',
      hover: '#324554',
      disabled: '#B0B0B0',
    },
    select: {
      border: '#453017',
      background: {
        default: 'transparent',
        hover: '#B8D2F3',
      },
    },
    dropdown: {
      background: {
        selected: '#D4BEA4',
        hover: '#D4BEA4',
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
    qrCodeText: '#FEF9F3',
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
