import React from 'react'
import Announcements from '../components/Announcements'
import HackerCountdown from '../containers/HackerCountdown'
import { CommonLinks } from '../containers/Quicklinks'
import Livestream from '../components/Livestream'

export default ({ announcements }) => {
  return (
    <>
      <HackerCountdown />
      <CommonLinks />
      <Livestream />
      <Announcements announcements={announcements} />
    </>
  )
}
