import React, { useState } from 'react'
import styled from 'styled-components'
import ReactCardFlip from 'react-card-flip'

const Container = styled.div`
  background-color: ${p => p.theme.colors.backgroundTertiary};
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  height: 180px;
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
  color: ${p => p.theme.colors.text};
`

const Text = styled.h3`
  font-size: 18px;
  font-weight: 300;
  margin-top: -12px;
  color: ${p => p.theme.colors.text};
`

const Description = styled.h3`
  font-size: 18px;
  font-weight: 300;
  text-align: center;
  color: ${p => p.theme.colors.text};
`

const SubTitle = styled.p`
  font-size: 14px;
  font-weight: 700;
  color: ${p => p.theme.colors.bar};
  text-align: right;
  margin-top: 8px;
`

const RedeemedText = styled(SubTitle)`
  text-align: center;
  margin-top: 8px;
  padding-top: 8px;
`

const Icon = styled.img`
  width: 70px;
  height: 100%;
  object-fit: contain;
`

const InfoIcon = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
  border: 2px solid ${p => p.theme.colors.lines};
  border-radius: 50%;
  color: ${p => p.theme.colors.text};
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
    background-color: ${p => p.theme.colors.barBackground};
    border-radius: 4px;
  }

  &::-webkit-progress-value {
    background-color: ${p => p.theme.colors.bar};
    border-radius: 4px 0 0 4px;
  }

  &::-moz-progress-bar {
    background-color: ${p => p.theme.colors.bar};
    border-radius: 4px 0 0 4px;
  }
`

const Back = styled.div`
  cursor: pointer;
`

const RewardCard = ({ name, type, desc, company, image, points, requiredPoints, redeemed }) => {
  const [isFlipped, setIsFlipped] = useState(false)
  const handleClick = e => {
    e.preventDefault()
    setIsFlipped(prevState => !prevState)
  }

  let progress = 0

  if (points === requiredPoints) {
    progress = 1
  } else {
    progress = points / requiredPoints
  }

  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <Container>
        <InfoIcon onClick={handleClick}>i</InfoIcon>
        <Grid>
          <Icon src={image} />
          <div>
            <Title>{name}</Title>
            {points >= requiredPoints ? (
              <Text>Completed!</Text>
            ) : (
              <Text>Reach {requiredPoints - points} pts</Text>
            )}
            {type === 'Raffle' ? <Text>Raffle Prize</Text> : type && <Text>Type: {type}</Text>}
          </div>
        </Grid>
        {redeemed && (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'end' }}>
            <RedeemedText>Already redeemed!</RedeemedText>
          </div>
        )}
        {points > 0 && !redeemed && (
          <div style={{ justifyContent: 'center', alignItems: 'center' }}>
            {points >= requiredPoints ? (
              <SubTitle>
                {requiredPoints}/{requiredPoints} pts
              </SubTitle>
            ) : (
              <SubTitle>
                {points}/{requiredPoints} pts
              </SubTitle>
            )}
            <ProgressContainer>
              <ProgressBar value={progress} />
            </ProgressContainer>
          </div>
        )}
      </Container>

      <Back onClick={handleClick}>
        <Container>
          <Description>
            {desc} {company && company !== 'None' ? `from ${company}` : ''}
          </Description>
        </Container>
      </Back>
    </ReactCardFlip>
  )
}

export default RewardCard
