import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MobileMenuBar from './MobileMenuBar'
import { isJudgingOpen } from '../utility/firebase'

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
`

const RightContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
`

const Content = styled.div`
  padding: 24px 60px;
  box-sizing: border-box;
  width: 100%;
`

const Page = ({ children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [isJudgingEnabled, setIsJudgingEnabled] = useState(false)

  useEffect(() => {
    const unsubscribe = isJudgingOpen(setIsJudgingEnabled)
    return unsubscribe
  }, [setIsJudgingEnabled])

  return (
    <Container>
      <Sidebar isJudgingEnabled={isJudgingEnabled} showMobileSidebar={showMobileSidebar} />
      <RightContentContainer>
        <MobileMenuBar
          showMobileSidebar={showMobileSidebar}
          setShowMobileSidebar={setShowMobileSidebar}
        />
        <Content>{children}</Content>
      </RightContentContainer>
    </Container>
  )
}

export default Page
