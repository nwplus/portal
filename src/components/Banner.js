import React from 'react'
import styled from 'styled-components'

// TODO: add more styling
const bannerWidth = {
  default: '320px',
  wide: '800px',
}

const StyledContainer = styled.div`
  background: rgba(75, 65, 130, 0.2);
  backdrop-filter: blur(15px);
  border-radius: 4px;
  padding: 24px 24px;
  margin: 0 50%;
  transform: translateX(-50%);
  width: ${p => (p.width ? bannerWidth[p.width] : bannerWidth.default)};
`

// TODO: Banner component
export default ({ className, width, children }) => (
  <StyledContainer className={className} width={width}>
    {children}
  </StyledContainer>
)
