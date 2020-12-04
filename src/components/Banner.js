import React from 'react'
import styled from 'styled-components'
import { CenterHorizontally } from './Common'

const bannerWidth = {
  default: '320px',
  wide: '800px',
}

const StyledContainer = styled.div`
  background: ${p => p.theme.colors.banner};
  backdrop-filter: ${p => (!!p.blur ? 'blur(15px)' : 'none')};
  border-radius: 4px;
  padding: 48px;
  ${CenterHorizontally}
  width: ${p => (p.wide ? bannerWidth.wide : bannerWidth.default)};
`

export default ({ className, wide, blur, children }) => {
  console.log(blur)
  return (
    <StyledContainer className={className} wide={wide} blur={blur}>
      {children}
    </StyledContainer>
  )
}
