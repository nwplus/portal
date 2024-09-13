import { useEffect, useState } from 'react'
import { useLocation } from 'wouter'
import styled, { keyframes } from 'styled-components'
import moment from 'moment'
import { H1 } from '../components/Typography'
import Loading from '../components/Loading'
import { SocialMediaLinks } from '../components/ApplicationDashboard'
import { livesiteDocRef } from '../utility/firebase'
import galaxy_desktop from '../assets/homepage/galaxy_desktop.svg'
import galaxy_mobile from '../assets/homepage/galaxy_mobile.svg'
import hc_planet from '../assets/homepage/hc_planet.svg'
import nwhacks_planet from '../assets/homepage/nwhacks_planet.svg'
import cmdf_planet from '../assets/homepage/cmdf_planet.svg'
import space_nugget from '../assets/homepage/space_nugget.svg'
import nwplus_icon from '../assets/nwplus_icon.svg'

// one of 'HackCamp', 'nwHacks', 'cmd-f', or null (when we're done for the year)
const UP_NEXT_HACKATHON_NAME = 'HackCamp'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

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

const StyledHackathonCard = styled.div`
  flex: 1;
  background: ${props => props.background || 'transparent'};
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  text-align: center;
  position: relative;
  overflow: hidden;

  ${p => p.theme.mediaQueries.tabletLarge} {
    justify-content: ${props => (props.isUpNext ? 'space-between' : 'center')};
    gap: ${props => (props.isUpNext ? '' : '10px')};
    flex-grow: ${props => (props.isUpNext ? 3 : 1)};
  }
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`

const Title = styled(H1)`
  font-size: 3rem;
  color: ${props => props.color};
  margin: 0;

  ${p => p.theme.mediaQueries.tabletLarge} {
    font-size: ${props => (props.isUpNext ? '3rem' : '2.5rem')};
  }

  ${p => p.theme.mediaQueries.mobile} {
    font-size: ${props => (props.isUpNext ? '2.5rem' : '1.5rem')};
  }
`

const Dates = styled(H1)`
  font-size: 1.25rem;
  margin: 0;
  color: ${props => props.color};

  ${p => p.theme.mediaQueries.mobile} {
    font-size: ${props => (props.isUpNext ? '1rem' : '0.8rem')};
  }
`

const PlanetContainer = styled.div`
  position: relative;
  width: min(70%, 700px);

  ${p => p.theme.mediaQueries.tabletLarge} {
    height: 40%;
    width: auto;
    display: ${props => (props.isUpNext ? 'block' : 'none')};
  }
`

const Planet = styled.img`
  width: 100%;
  height: auto;

  ${p => p.theme.mediaQueries.tabletLarge} {
    height: 100%;
    width: auto;
  }
`

const SpaceNuggetContainer = styled.div`
  position: absolute;
  width: 60%;
  top: 10%;
  left: 42%;
  transform: translate(-50%, -50%);
  z-index: 2;

  ${p => p.theme.mediaQueries.tabletLarge} {
    width: 50%;
    top: 15%;
  }
`

const SpaceNuggetImage = styled.img`
  width: min(100%, 300px);
  height: auto;
  animation: ${float} 3s ease-in-out infinite;
`

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  z-index: 2;
`

const Button = styled.button`
  position: relative;
  width: 250px;
  padding: 12px 24px;
  z-index: 2;

  font-size: 1.25rem;
  font-weight: ${p => p.theme.typography.h1.weight};
  font-family: ${p => p.theme.typography.headerFont};

  background: ${props => props.color};
  color: ${props => props.labelColor};
  border: none;
  border-radius: 8px;

  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: ${props => props.hoverColor || props.color};
  }

  ${p => p.theme.mediaQueries.tabletLarge} {
    width: ${props => (props.isUpNext ? '250px' : '175px')};
    padding: 8px 0;
    font-weight: 600;
    font-size: 1.15rem;
  }

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 1.15rem;
    width: ${props => (props.isUpNext ? '175px' : '125px')};
  }
`

const ApplicationStatusTextDesktop = styled(H1)`
  font-size: 1.15rem;
  font-weight: 600;

  ${p => p.theme.mediaQueries.tabletLarge} {
    display: ${props => (props.isUpNext ? 'block' : 'none')};
  }

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 0.8rem;
  }
`

const ApplicationStatusTextMobile = styled(H1)`
  font-weight: 600;
  display: none;

  ${p => p.theme.mediaQueries.tabletLarge} {
    display: ${props => (props.isUpNext ? 'none' : 'block')};
    font-size: 1rem;
  }

  ${p => p.theme.mediaQueries.mobile} {
    font-size: 0.8rem;
  }
`

// helps group items in mobile view
const MobileContainer = styled.div`
  display: contents;

  ${p => p.theme.mediaQueries.tabletLarge} {
    display: ${props => (props.isUpNext ? 'contents' : 'flex')};
    flex-direction: ${props => (props.isUpNext ? 'column' : 'row')};
    gap: ${props => (props.isUpNext ? '0' : '10vw')};
    justify-content: center;
    align-items: center;
  }
`

// example deadline format: February 22nd, 2025 at 11:59 PM (Pacific Time)
const getApplicationStatusText = (applicationOpen, applicationDeadline) => {
  const deadlineDate = moment(applicationDeadline, 'MMMM Do, YYYY [at] h:mm A')
  const isDeadlinePassed = moment().isAfter(deadlineDate)

  if (isDeadlinePassed) return 'Applications closed'
  if (!applicationOpen) return 'Applications opening soon!'
  return `Applications close on ${deadlineDate.format('MMM D, YYYY')}!`
}

const handleNavigation = (applicationOpen, visitWebsite, hackathonName, navigate) => {
  if (applicationOpen || !visitWebsite) return navigate(`/app/${hackathonName.toLowerCase()}`)

  const websites = {
    'HackCamp': 'https://hackcamp.nwplus.io',
    'nwHacks': 'https://nwhacks.io',
    'cmd-f': 'https://cmd-f.nwplus.io',
  }
  window.open(websites[hackathonName], '_blank', 'noopener,noreferrer')
}

const HackathonCard = ({
  background,
  hackathonName,
  dates,
  headerTextColour,
  buttonColour,
  buttonTextColour,
  buttonHoverColor,
  planet,
  applicationDeadline,
  applicationOpen,
  visitWebsite,
}) => {
  const [_, navigate] = useLocation()
  const isUpNext = UP_NEXT_HACKATHON_NAME === hackathonName

  return (
    <StyledHackathonCard background={background} isUpNext={isUpNext}>
      <MobileContainer isUpNext={isUpNext}>
        <Header>
          <Title color={headerTextColour} isUpNext={isUpNext}>
            {hackathonName}
          </Title>
          <Dates color={headerTextColour} isUpNext={isUpNext}>
            {dates}
          </Dates>
        </Header>

        <PlanetContainer isUpNext={isUpNext}>
          <Planet src={planet} hackathonName={hackathonName} />
          {isUpNext && (
            <SpaceNuggetContainer>
              <SpaceNuggetImage src={space_nugget} />
            </SpaceNuggetContainer>
          )}
        </PlanetContainer>

        <ButtonContainer>
          <Button
            color={buttonColour}
            labelColor={buttonTextColour}
            onClick={() => {
              handleNavigation(applicationOpen, visitWebsite, hackathonName, navigate)
            }}
            hoverColor={buttonHoverColor}
            isUpNext={isUpNext}
          >
            {applicationOpen ? 'Apply now' : visitWebsite ? 'Visit website' : 'Enter Portal'}
          </Button>
          <ApplicationStatusTextDesktop isUpNext={isUpNext}>
            {getApplicationStatusText(applicationOpen, applicationDeadline)}
          </ApplicationStatusTextDesktop>
        </ButtonContainer>
      </MobileContainer>

      <ApplicationStatusTextMobile isUpNext={isUpNext}>
        {getApplicationStatusText(applicationOpen, applicationDeadline)}
      </ApplicationStatusTextMobile>
    </StyledHackathonCard>
  )
}

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
