import React from 'react'
import styled from 'styled-components'

const CenteredH1 = styled.h1`
  text-align: center;
`

export default () => {
  return (
    <div>
      <CenteredH1>Overall Prizes</CenteredH1>
      <CenteredH1>Sponsored Categories</CenteredH1>
    </div>
  )
}
