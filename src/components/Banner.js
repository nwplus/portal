import React from 'react'
import styled from 'styled-components'
import { CenterHorizontally } from './Common'

const bannerWidth = {
  default: '320px',
  wide: '800px',
}

const StyledContainer = styled.div`
  background: ${p => p.theme.colors.banner};
  backdrop-filter: blur(15px);
  border-radius: 4px;
  padding: 48px;
  ${CenterHorizontally}
  width: ${p => (p.wide ? bannerWidth.wide : bannerWidth.default)};
`

export default ({ className, wide, children }) => (
  <StyledContainer className={className} wide={wide}>
    {children}
  </StyledContainer>
)
