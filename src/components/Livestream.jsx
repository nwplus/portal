import React from 'react'
import styled, { keyframes } from 'styled-components'
import { CardWithHeader } from './Common'
import { H2 } from './Typography'

const Container = styled(CardWithHeader)`
  text-align: center;
`

const TwitchContainer = styled.div`
  overflow: hidden;
  /* 16:9 aspect ratio */
  padding-top: 56.25%;
  position: relative;
`

const TwitchFrame = styled.iframe`
  left: 0;
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 5px;
  border: none;
`

const LeftAlign = styled.div`
  text-align: left;
  margin: 0 auto;
`

const Pulse = keyframes`
  0% {
    background-color: #ff0000;
  }
  50% {
    background-color: #ff000000;
  }
  100 {
    background-color: #ff0000;
  }
`

const LiveDot = styled.span`
  height: 15px;
  width: 15px;
  background-color: #f00;
  border-radius: 50%;
  display: inline-block;
  animation: ${Pulse} 1.5s ease infinite;
`

const StyledH2 = styled(H2)`
  color: ${p => p.theme.colors.textLivestream};
  opacity: 1;
  margin-bottom: 0;
`

const Livestream = () => {
  return (
    <Container>
      <TwitchContainer>
        <TwitchFrame
          src="https://player.twitch.tv/?channel=nwplus2023&parent=localhost&parent=portal.nwplus.io&parent=nwplus-ubc.web.app"
          frameborder="0"
          scrolling="no"
          allowfullscreen="true"
        ></TwitchFrame>
      </TwitchContainer>
      <LeftAlign>
        <StyledH2>
          <LiveDot /> nwPlus - Live
        </StyledH2>
      </LeftAlign>
    </Container>
  )
}

export default Livestream
