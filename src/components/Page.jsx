import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from './Sidebar'
import MobileMenuBar from './MobileMenuBar'
import { getLivesiteDoc } from '../utility/firebase'
import { useHackathon } from '../utility/HackathonProvider'
import Loading from './Loading'

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
  const [livesiteDoc, setLivesiteDoc] = useState(null)
  const { activeHackathon } = useHackathon()

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(setLivesiteDoc)
    return unsubscribe
  }, [])

  if (!livesiteDoc) {
    return <Loading />
  }

  return (
    <Container>
      <Sidebar
        isJudgingOpen={livesiteDoc.judgingOpen[activeHackathon]}
        isJudgingReleased={livesiteDoc.judgingReleased[activeHackathon]}
        isSubmissionsOpen={livesiteDoc.submissionsOpen[activeHackathon]}
        isApplicationOpen={livesiteDoc.applicationsOpen[activeHackathon]}
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
