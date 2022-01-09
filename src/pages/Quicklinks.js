import React from 'react'
import { CommonLinks, QuickLinks } from '../containers/Quicklinks'
import GettingStarted from './GettingStarted'

export default () => {
  return (
    <>
      <GettingStarted />
      <CommonLinks />
      <QuickLinks />
    </>
  )
}
