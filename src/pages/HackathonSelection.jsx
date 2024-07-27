import React from 'react'
import styled from 'styled-components'
import hc_ring from '../assets/homepage/hc_ring.svg'
import hc_planet from '../assets/homepage/hc_planet.svg'
import nwHacks_ring from '../assets/homepage/nwHacks_ring.svg'
import { H1, H2 } from '../components/Typography'

const HackathonSelectionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: stretch;
  height: 100vh;
`

const HackathonCard = styled.div`
  display: flex;
  flex: 0 0 33.33%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5vh;
  background: ${props => props.background};
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const EventTitle = styled.h1`
  font-size: 3rem;
  color: #fff;
  margin: 0;
`

const EventDate = styled.h2`
  font-size: 1.5rem;
  color: #fff;
  opacity: 0.7;
`

const PlanetContainer = styled.div`
  position: relative;
  width: 60%;
  aspect-ratio: 1 / 1;
`

const Planet = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: ${props => props.planetGradient};
  transition: all 0.3s ease;
  z-index: 2;

  &::before,
  &::after {
    content: '';
    position: absolute;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    transition: all 0.3s ease;
  }

  &::before {
    width: 110%;
    height: 110%;
    background: ${props => props.planetGradient};
  }

  &::after {
    width: 120%;
    height: 120%;
    background: ${props => props.planetGradient};
  }

  ${PlanetContainer}:hover &::before {
    opacity: 0.6;
  }

  ${PlanetContainer}:hover &::after {
    opacity: 0.4;
  }
`

const HackCampRing = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120%;
  height: 120%;
  pointer-events: none;
  opacity: 0.4;
  z-index: 4;
  // z-index: 1;
  // clip-path: circle(45% at center);
`

const NwHacksRing = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-51%, -50%);
  width: 145%;
  height: 145%;
  pointer-events: none;
  opacity: 0.3;
  z-index: 4;
`

// const HackCampRingClipped = styled(HackCampRing)
//   clip-path: circle(100% at center);
//   z-index: 1;
//

const HackathonSelection = () => {
  const hackathons = [
    {
      title: 'HackCamp',
      background: 'linear-gradient(180deg, #605091 0%, #2C2543 92.26%)',
      planetGradient: 'linear-gradient(0deg, #20FFAF -10.56%, #01DACC 100%)',
      buttonColor: '#FFD700',
      dates: 'Nov 9-10, 2024',
      live: false,
    },
    {
      title: 'nwHacks',
      background: 'linear-gradient(180deg, #77F8EF 0%, #007A72 123.72%)',
      planetGradient: 'linear-gradient(180deg, #E2B3D5 0%, #BB6DD8 45.17%, #7744B6 100%)',
      buttonColor: '#FFD700',
      dates: 'Jan 18-19, 2025',
      live: false,
    },
    {
      title: 'cmd-f',
      background: 'linear-gradient(180deg, #C4B2F0 0%, #433860 110.44%)',
      planetGradient: '#fff',
      buttonColor: '#FFD700',
      dates: 'Mar 8-9, 2025',
      live: false,
    },
  ]

  return (
    <HackathonSelectionContainer>
      {hackathons.map((hackathon, index) => (
        <HackathonCard key={index} background={hackathon.background}>
          <Header>
            <EventTitle>{hackathon.title}</EventTitle>
            <EventDate>{hackathon.dates}</EventDate>
          </Header>
          <PlanetContainer>
            <Planet planetGradient={hackathon.planetGradient} />
            {hackathon.title === 'HackCamp' && <HackCampRing src={hc_ring} />}
            {hackathon.title === 'nwHacks' && <NwHacksRing src={nwHacks_ring} />}
          </PlanetContainer>
          {/* <VisitButton color={hackathon.buttonColor}>visit</VisitButton> */}
        </HackathonCard>
      ))}
    </HackathonSelectionContainer>
  )
}

export default HackathonSelection
