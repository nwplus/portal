import React from 'react'
import { Link } from 'wouter'
import Page from '../components/Page'
import HeroPage from '../components/HeroPage'
import { A } from '../components/Typography'

export default () => (
  <Page>
    <HeroPage>
      <h1>Oh no, page not found!</h1>
      Return to{' '}
      <Link href="/">
        <A>home</A>
      </Link>
    </HeroPage>
  </Page>
)
