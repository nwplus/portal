import React, { useState } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'
import egg from '../assets/egg.svg'

const Container = styled.div`
  background-color: ${p => p.theme.colors.backgroundSecondary};
  border-radius: 8px;
  padding: 20px;
  width: 280px;
  height: 160px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
`

const Title = styled.h1`
  font-size: 24px;
  font-weight: 400;
`

const Text = styled.h3`
  font-size: 18px;
  font-weight: 300;
  margin-top: -12px;
`

const Description = styled.h3`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
`

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.theme.colors.sidebar.textSectionHeader};
  text-align: right;
  margin-top: 8px;
`

const Icon = styled.img`
  width: 70px;
  height: 100%;
`

const InfoIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: 2px solid white;
  border-radius: 50%;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: Corben;
  font-weight: 400;
`

const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  height: 16px;
  border-radius: 4px;
  background-color: ${p => p.theme.colors.background};
  overflow: hidden;
  margin-top: -8px;
`

const ProgressBar = styled.progress`
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 20px;

  &::-webkit-progress-bar {
    background-color: ${p => p.theme.colors.background};
    border-radius: 4px;
  }

  &::-webkit-progress-value {
    background-color: ${p => p.theme.colors.sidebar.textSectionHeader};
    border-radius: 4px 0 0 4px;
  }

  &::-moz-progress-bar {
    background-color: ${p => p.theme.colors.sidebar.textSectionHeader};
    border-radius: 4px 0 0 4px;
  }
`

const Back = styled.div`
  cursor: pointer;
`

const RewardCard = ({ name, req, desc, image, points, maxPoints, workshops, maxWorkshops }) => {
  console.log('workshops', workshops)
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = e => {
    e.preventDefault()
    setIsFlipped(prevState => !prevState)
  }

  const isWorkshop = typeof maxWorkshops !== 'undefined'
  let progress = 0

  if (isWorkshop) {
    if (workshops === maxWorkshops) {
      progress = 1
      req = 'Completed!'
    } else {
      progress = workshops / maxWorkshops
    }
  } else {
    if (points === maxPoints) {
      progress = 1
      req = 'Completed!'
    } else {
      progress = points / maxPoints
    }
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Container>
        <InfoIcon onClick={handleClick}>i</InfoIcon>
        <Grid>
          <Icon src={egg} />
          <div>
            <Title>{name}</Title>
            <Text>{req}</Text>
          </div>
        </Grid>
        <div style={{ justifyContent: 'center', alignItems: 'center' }}>
          {isWorkshop ? (
            <SubTitle>
              {workshops}/{maxWorkshops} workshops
            </SubTitle>
          ) : (
            <SubTitle>
              {points}/{maxPoints} pts
            </SubTitle>
          )}
          <ProgressContainer>
            <ProgressBar value={progress} />
          </ProgressContainer>
        </div>
      </Container>

      <Back onClick={handleClick}>
        <Container>
          <Description>{desc}</Description>
        </Container>
      </Back>
    </ReactCardFlip>
  )
}

export default RewardCard
