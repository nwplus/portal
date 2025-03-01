import React, { useContext } from 'react'
import Landing from '../../containers/Landing'
import { A } from '../../components/Typography'
import { SOCIAL_LINKS } from '../../utility/Constants'
import { copyText } from '../../utility/Constants'
import { useHackathon } from '../../utility/HackathonProvider'

const Closed = () => {
  const { activeHackathon } = useHackathon()

  return (
    <Landing
      heading={`Thanks for your interest in ${copyText[activeHackathon].hackathonName}`}
      description={
        <>
          We are no longer accepting applications, but we do hope to see you at our future events!
          Visit our site{' '}
          <A bolded color="primary" href={SOCIAL_LINKS.WEBSITE}>
            nwplus.io
          </A>{' '}
          or follow us on social media to learn about our events and other ways to engage with the
          technology community!
        </>
      }
      showFooter
      showAltBackground
    />
  )
}

export default Closed
