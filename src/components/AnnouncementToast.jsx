import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import CloseIcon from '../assets/close.svg'

const ToastBackground = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  backdrop-filter: blur(3px);
  display: ${p => (p.shown ? 'block' : 'none')};
  z-index: 999;
`
const ToastDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  border: none;
  outline: none;
  background: linear-gradient(92.58deg, #0defe1 0%, #78ff96 100%);
  position: fixed;
  -webkit-text-fill-color: #2c2543;
  color: #2c2543;
  text-decoration: none;
  top: ${p => (p.shown ? '40px' : '-100px')};
  transition: margin-top 0.5s ease-in;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5em;
  left: 0;
  right: 0;
  border-radius: 5px;
  word-break: break-word;
  z-index: 1000;
  font-size: 20px;
  font-weight: 600;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    inset: 0;
    border: 1px solid transparent;
    border-radius: 5px;
    background: inherit;
    background-origin: border-box;
    background-clip: border-box;
    -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    -webkit-mask-repeat: no-repeat;
  }
`

const Icon = styled.span`
  margin: 0 4px;
  -webkit-text-fill-color: red;
  color: red;
`

const ToastText = styled.div`
  padding: 0 8px;
  flex: 1;
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`

export default function AnnouncementToast({ text }) {
  const [showToast, setShowToast] = useState(false)

  useEffect(() => {
    if (text) {
      setShowToast(true)
    } else {
      setShowToast(false)
    }
  }, [text])

  return (
    <>
      <ToastBackground shown={showToast} />
      <ToastDiv key={text} shown={showToast}>
        <div>
          <Icon>&#8252;</Icon>ANNOUNCEMENT<Icon>&#8252;</Icon>
        </div>
        <ToastText>{text}</ToastText>
        <CloseButton onClick={() => setShowToast(false)}>
          <img src={CloseIcon} alt="Close Button" />
        </CloseButton>
      </ToastDiv>
    </>
  )
}
