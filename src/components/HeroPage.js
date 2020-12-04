import React from 'react'
import styled from 'styled-components'

const HeroContent = styled.div`
  height: 60vh;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default ({ children }) => <HeroContent>{children}</HeroContent>
