import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MobileMenuBar from './MobileMenuBar'
import { getLivesiteDoc } from '../utility/firebase'

const Container = styled.div`
  display: flex;
  align-items: stretch;
  min-height: 100vh;
  max-width: 100vw;
  overflow-x: hidden;
`

const RightContentContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
`

const Content = styled.div`
  padding: 24px 50px;
  box-sizing: border-box;
  width: 100%;
  ${p => p.theme.mediaQueries.mobile} {
    padding: 8px 20px;
  }
`

const Page = ({ hackerStatus, children }) => {
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)
  const [livesiteDoc, setLivesiteDoc] = useState(false)

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [setLivesiteDoc])

  return (
    <Container>
      <Sidebar
        isJudgingOpen={livesiteDoc.judgingOpen}
        isJudgingReleased={livesiteDoc.judgingReleased}
        isSubmissionsOpen={livesiteDoc.submissionsOpen}
        isApplicationOpen={livesiteDoc.applicationsOpen}
        showMobileSidebar={showMobileSidebar}
        hideSidebarCallback={() => setShowMobileSidebar(false)}
        hackerStatus={hackerStatus}
      />
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
