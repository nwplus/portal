import { createGlobalStyle } from 'styled-components'
import './fonts/style.css'

export default createGlobalStyle`
  body {
    margin: 0;
    font-family: 'HK Grotesk';
    background: ${(p) => p.theme.colors.background};
    color: ${(p) => p.theme.colors.text};
  }
`
