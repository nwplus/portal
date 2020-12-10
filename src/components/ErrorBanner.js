import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

const ErrorDiv = styled.div`
  max-width: 400px;
  background-color: ${p => p.theme.colors.error};
  position: fixed;
  bottom: ${p => (p.shown ? '10px' : '-100px')};
  opacity: ${p => (p.shown ? '100%' : '0%')};
  transition: all 0.5s ease-in;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  border-radius: 5px;
`
const ErrorText = styled.p`
  text-align: center;
  color: ${p => p.theme.colors.errorText};
  margin: 10px 20px;
`

export default function ErrorBanner({ children }) {
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    if (children) {
      setShowError(true)
    } else {
      setShowError(false)
    }
    const errorTimeOut = setTimeout(() => {
      setShowError(false)
    }, 10000)
    return () => {
      clearTimeout(errorTimeOut)
    }
  }, [children])

  return (
    <>
      <ErrorDiv shown={showError}>
        <ErrorText>{children}</ErrorText>
      </ErrorDiv>
    </>
  )
}
