import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MobileMenuBar from './MobileMenuBar'
import { getJudgingStatus } from '../utility/firebase'

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
  const [isJudgingOpen, setIsJudgingOpen] = useState(false)

  useEffect(() => {
    const unsubscribe = getJudgingStatus(setIsJudgingOpen)
    return unsubscribe
  }, [setIsJudgingOpen])

  return (
    <Container>
      <Sidebar isJudgingOpen={isJudgingOpen} showMobileSidebar={showMobileSidebar} />
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
