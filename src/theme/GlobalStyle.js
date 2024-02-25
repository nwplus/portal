import { createGlobalStyle } from 'styled-components'
import './fonts/style.css'
import { backgroundImage } from '../assets/cmdf_homebg.svg'

export default createGlobalStyle`
  body {
    margin: 0;
    font-family: ${p => p.theme.typography.bodyFont};
    background: ${p => p.theme.colors.background};
    color: ${p => p.theme.colors.text};
  }
`
