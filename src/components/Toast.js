import React, { useEffect, useState } from 'react'

import styled from 'styled-components'

const ToastDiv = styled.div`
  width: 25%;
  background-color: ${p => (p.type === 'success' ? p.theme.colors.success : p.theme.colors.error)};
  position: fixed;
  bottom: ${p => (p.shown ? '40px' : '-100px')};
  opacity: ${p => (p.shown ? '100%' : '0%')};
  transition: all 0.5s ease-in;
  margin-left: auto;
  margin-right: auto;
  padding: 0.25em 0.5em 0.5em;
  left: 0;
  right: 0;
  border-radius: 5px;
  word-break: break-word;
`
const ToastText = styled.p`
  text-align: center;
  color: ${p => p.theme.colors.toastText};
  margin: 10px 20px;
`

export default function Toast({ children, type = 'error' }) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (children) {
      setShowToast(true)
    } else {
      setShowToast(false)
    }
    const errorTimeOut = setTimeout(() => {
      setShowToast(false)
    }, 10000)
    return () => {
      clearTimeout(errorTimeOut)
    }
  }, [children])

  return (
    <>
      <ToastDiv shown={showToast} type={type}>
        <ToastText>{children}</ToastText>
      </ToastDiv>
    </>
  )
}
