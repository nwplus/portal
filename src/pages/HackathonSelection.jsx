import { useEffect, useState } from 'react'
import styled from 'styled-components'

import Loading from '../components/Loading'
import { SocialMediaLinks } from '../components/ApplicationDashboard'
import { livesiteDocRef } from '../utility/firebase'
import galaxy_desktop from '../assets/homepage/galaxy_desktop.svg'
import galaxy_mobile from '../assets/homepage/galaxy_mobile.svg'
import hc_planet from '../assets/homepage/hc_planet.svg'
import nwhacks_planet from '../assets/homepage/nwhacks_planet.svg'
import cmdf_planet from '../assets/homepage/cmdf_planet.svg'
import nwplus_icon from '../assets/nwplus_icon.svg'
import HackathonCard from '../components/HackathonCard'

// one of 'HackCamp', 'nwHacks', 'cmd-f', or null (when we're done for the year)
const UP_NEXT_HACKATHON_NAME = 'HackCamp'

const HackathonSelectionContainer = styled.div`
  display: flex;
  position: relative;
  height: 100dvh;
  width: 100vw;

  ${p => p.theme.mediaQueries.tabletLarge} {
    flex-direction: column;
  }
`

const Logo = styled.img`
  position: absolute;
  top: 20px;
  left: 20px;
  height: 50px;
  width: auto;
  z-index: 2;
  cursor: pointer;

  ${p => p.theme.mediaQueries.tabletLarge} {
    display: none;
  }
`

const GalaxyOverlay = styled.div`
  position: absolute;
  opacity: 0.3;
  inset: 0;
  background-image: url(${galaxy_desktop});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 1;

  ${p => p.theme.mediaQueries.tabletLarge} {
    background-image: url(${galaxy_mobile});
    opacity: 0.3;
  }
`

const SocialMediaLinksContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 2;

  ${p => p.theme.mediaQueries.tabletLarge} {
    display: none;
  }
`

// hex codes are hardcoded in this component because they don't belong to a theme
export default function HackathonSelection() {
  const [applicationData, setApplicationData] = useState({
    deadlines: {},
    openStatuses: {},
    hackathonWeekends: {},
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = livesiteDocRef.onSnapshot(doc => {
      const data = doc.data()
      if (data) {
        setApplicationData({
          deadlines: data.applicationDeadline,
          openStatuses: data.applicationsOpen,
          hackathonWeekends: data.hackathonWeekend,
        })
      }
      setIsLoading(false)
    })
    return unsubscribe
  }, [])

  if (isLoading) {
    return <Loading />
  }

  return (
    <HackathonSelectionContainer>
      <GalaxyOverlay />
      <Logo
        src={nwplus_icon}
        onClick={() => window.open('https://nwplus.io', '_blank', 'noopener,noreferrer')}
      />
      <SocialMediaLinksContainer>
        <SocialMediaLinks />
      </SocialMediaLinksContainer>

      <HackathonCard
        background="linear-gradient(180deg, #605091 0%, #2C2543 92.26%)"
        hackathonName={'HackCamp'}
        isUpNext={UP_NEXT_HACKATHON_NAME === 'HackCamp'}
        dates={applicationData.hackathonWeekends.hackcamp}
        planet={hc_planet}
        buttonColour={'linear-gradient(92.58deg, #0DEFE1 0%, #78FF96 100%)'}
        buttonTextColour={'#2C2543'}
        buttonHoverColor={'linear-gradient(90deg, #00DBCE 0%, #00D88A 100%)'}
        applicationDeadline={applicationData.deadlines.hackcamp}
        applicationOpen={applicationData.openStatuses.hackcamp}
      />
      <HackathonCard
        background="linear-gradient(180deg, #77F8EF 0%, #007A72 123.72%)"
        hackathonName={'nwHacks'}
        isUpNext={UP_NEXT_HACKATHON_NAME === 'nwHacks'}
        dates={applicationData.hackathonWeekends.nwhacks}
        headerTextColour={'#2C2543'}
        planet={nwhacks_planet}
        buttonColour={'#2C2543'}
        buttonTextColour={'#ffffff'}
        buttonHoverColor={'#423764'}
        applicationDeadline={applicationData.deadlines.nwhacks}
        applicationOpen={applicationData.openStatuses.nwhacks}
      />
      <HackathonCard
        background="linear-gradient(180deg, #C4B2F0 0%, #433860 110.44%)"
        hackathonName={'cmd-f'}
        isUpNext={UP_NEXT_HACKATHON_NAME === 'cmd-f'}
        dates={applicationData.hackathonWeekends['cmd-f']}
        planet={cmdf_planet}
        buttonColour={'#ffffff'}
        buttonTextColour={'#2C2543'}
        buttonHoverColor={'#E6E6E6'}
        applicationDeadline={applicationData.deadlines['cmd-f']}
        applicationOpen={applicationData.openStatuses['cmd-f']}
        visitWebsite
      />
    </HackathonSelectionContainer>
  )
}
