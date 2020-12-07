import React from 'react'
import { Link } from 'wouter'
import MoonLoader from 'react-spinners/MoonLoader'
import styled from 'styled-components'
import { A } from './Typography'

const HeroContent = styled.div`
  height: 80vh;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const HeroPage = ({ children }) => (
  <HeroContent>
    <div>{children}</div>
  </HeroContent>
)

export const JudgingNotOpen = () => (
  <HeroPage>
    <h1>Judging is not open</h1>
    Please check back later. Return to{' '}
    <Link href="/">
      <A>home</A>
    </Link>
  </HeroPage>
)

export const Loading = () => (
  <HeroPage>
    <MoonLoader color="#fff" size={80} />
  </HeroPage>
)

export default HeroPage
