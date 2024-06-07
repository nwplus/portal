import React from 'react'
import styled from 'styled-components'
import { CenterHorizontally } from './Common'

const bannerWidth = {
  default: '320px',
  wide: '100%',
}

const StyledContainer = styled.div`
  background: ${p => p.theme.colors.banner};
  backdrop-filter: ${p => (!!p.blur ? 'blur(15px)' : 'none')};
  border-radius: 4px;
  padding: 48px;
  ${CenterHorizontally}
  width: ${p => (p.wide ? bannerWidth.wide : bannerWidth.default)};
`

const Banner = ({ className, wide, blur, children }) => {
  return (
    <StyledContainer className={className} wide={wide} blur={blur}>
      {children}
    </StyledContainer>
  )
}

export default Banner
