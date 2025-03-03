import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAuth } from '../utility/Auth'
import { useHackathon } from '../utility/HackathonProvider'
import { getLivesiteDoc } from '../utility/firebase'

const Banner = styled.div`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${props => props.theme.colors.error};
  color: white;
  text-align: center;
  font-weight: bold;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`
const BannerSpacer = styled.div`
  width: 100%;
  height: 40px;
`

const PortalStatusBanner = () => {
  const [isPortalLive, setIsPortalLive] = useState(true)
  const { activeHackathon } = useHackathon()
  const { user } = useAuth()

  useEffect(() => {
    const unsubscribe = getLivesiteDoc(doc => {
      if (doc) {
        setIsPortalLive(doc.portalLive[activeHackathon])
      }
    })
    return unsubscribe
  }, [activeHackathon])

  if (isPortalLive || !user?.admin) return null

  return (
    <>
      <Banner>Portal is not live yet. Only admins can see non-application pages</Banner>
      <BannerSpacer />
    </>
  )
}

export default PortalStatusBanner
