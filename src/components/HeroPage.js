import React from 'react'
import { Link } from 'wouter'
import styled from 'styled-components'
import { A } from './Typography'

const HeroContent = styled.div`
  height: 60vh;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HeroPage = ({ children }) => <HeroContent>{children}</HeroContent>

export const JudgingNotOpen = () => (
  <HeroPage>
    <div>
      <h1>Judging is not open</h1>
      Please check back later. Return to{' '}
      <Link href="/">
        <A>home</A>
      </Link>
    </div>
  </HeroPage>
)

export default HeroPage
