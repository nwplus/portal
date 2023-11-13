import React from 'react'
import styled from 'styled-components'

import hackcamp2023bg from '../assets/hc2023mainbg.png'
import hackcamp2023noobjectsbg from '../assets/hc2023noobjectsbg.png'

const Hackcamp2023Background = styled.div`
  position: fixed;
  background-image: URL(${hackcamp2023bg});
  background-repeat: no-repeat;
  background-size: cover;
  min-width: calc(100% - 265px);
  min-height: 100%;
  z-index: -1;
  top: 0;
  left: 270px;

  ${p => p.theme.mediaQueries.mobile} {
    left: 0px;
    min-width: 100%;
  }
`

const Hackcamp2023NoObjectsBackground = styled.div`
  position: fixed;
  background-image: URL(${hackcamp2023noobjectsbg});
  background-repeat: no-repeat;
  background-size: cover;
  min-width: calc(100% - 265px);
  min-height: 100%;
  z-index: -1;
  top: 0;
  left: 270px;

  ${p => p.theme.mediaQueries.mobile} {
    left: 0px;
    min-width: 100%;
  }
`

const Hackcamp2023BG = ({ version }) => {
  if (version == 'noObjects') {
    return <Hackcamp2023NoObjectsBackground />
  } else {
    return <Hackcamp2023Background />
  }
}

export default Hackcamp2023BG
