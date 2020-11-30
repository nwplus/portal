import React from 'react'

import styled from 'styled-components'

const ErrorDiv = styled.div`
  width: 300px;
  height: 50px;
  background-color: ${p => p.theme.colors.error};
  position: fixed;
  bottom: ${p => (p.shown ? '10px' : '-100px')};
  transition: all 2s ease-in;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border: 1px solid grey;
  border-radius: 5px;
`
const ErrorText = styled.p`
  text-align: center;
  color: ${p => p.theme.colors.errorText};
`

export function ErrorBanner({ message, shown }) {
  return (
    <ErrorDiv shown={shown}>
      <ErrorText>{message}</ErrorText>
    </ErrorDiv>
  )
}
