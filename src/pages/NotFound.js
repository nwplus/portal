import React from 'react'
import { Link } from 'wouter'
import HeroPage from '../components/HeroPage'
import { A } from '../components/Typography'

export default () => (
  <HeroPage>
    <h1>Oh no, page not found!</h1>
    Return to{' '}
    <Link href="/">
      <A>home</A>
    </Link>
  </HeroPage>
)
