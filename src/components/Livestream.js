import React from 'react';
import styled, { keyframes } from 'styled-components'
import { Card } from '../components/Common.js'
import { H2 } from '../components/Typography'

const TwitchFrame = styled.iframe`
  border-radius: 5px;
  border: none;
`

const LivestreamContainer = styled(Card)`
  text-align: center;
`

const LeftAlign = styled.div`
  width: 1280px;
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

const Livestream = () => {
  return (
    <LivestreamContainer>
      <TwitchFrame
        src="https://player.twitch.tv/?channel=nwplus&parent=localhost&parent=live.nwplus.io"
        height="720"
        width="1280"
        frameborder="0"
        scrolling="no"
        allowfullscreen="true">
      </TwitchFrame>
      <LeftAlign>
        <H2><LiveDot /> nwPlus - Live</H2>
      </LeftAlign>
    </LivestreamContainer>
  );
}

export default Livestream